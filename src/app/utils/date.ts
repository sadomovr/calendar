import dayjs from "dayjs";
import { CalendarDay } from "../types/calendar.ts";

export function generateCalendar(month: number, year: number): CalendarDay[] {
	const calendar: CalendarDay[] = [];

	const startOfMonth = dayjs(`${year}-${month}-01`);
	const startDayOfWeek = startOfMonth.day();
	const endOfMonth = startOfMonth.endOf('month');
	const daysInMonth = endOfMonth.date();

	const previousMonth = startOfMonth.subtract(1, 'month');
	const lastSundayOfPreviousMonth = previousMonth.endOf('month').day(0);

	for (let i = 0; i < startDayOfWeek; i++) {
		calendar.push({
			date: lastSundayOfPreviousMonth.add(i, 'day'),
			isFirstMonthDay: false,
			isLastMonthDay: i === startDayOfWeek - 1,
			isInCurrentMonth: false,
			holidays: [],
			tasks: [],
		});
	}

	for (let i = 1; i <= daysInMonth; i++) {
		calendar.push({
			date: startOfMonth.date(i),
			isFirstMonthDay: i == 1,
			isLastMonthDay: i === daysInMonth,
			isInCurrentMonth: true,
			holidays: [],
			tasks: []
		});
	}

	if( calendar[ calendar.length - 1].date.day() !== 6 ) {
		const daysToAdd = 7 - (calendar.length % 7);
		const nextMonth = startOfMonth.add(1, 'month');
		const firstSundayOfNextMonth = nextMonth.startOf('month')

		for (let i = 0; i < daysToAdd; i++) {
			calendar.push({
				date: firstSundayOfNextMonth.add(i, 'day'),
				isFirstMonthDay: i === 0,
				isLastMonthDay: i === daysInMonth,
				isInCurrentMonth: false,
				holidays: [],
				tasks: []
			});
		}
	}

	return calendar;
}
