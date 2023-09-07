import dayjs from "dayjs";
import { CalendarDay } from "../types/calendar.ts";

export function generateCalendar(month: number, year: number): CalendarDay[] {
	const calendar: CalendarDay[] = [];

	const startOfMonth = dayjs(`${year}-${month}-01`);
	const startDayOfWeek = startOfMonth.day();
	const endOfMonth = startOfMonth.endOf('month');
	const daysInMonth = endOfMonth.date();

	// Находим последнее воскресенье прошлого месяца
	const previousMonth = startOfMonth.subtract(1, 'month');
	const lastSundayOfPreviousMonth = previousMonth.endOf('month').day(0);

	// Добавляем дни предыдущего месяца, если месяц не начинается с воскресенья
	for (let i = 0; i < startDayOfWeek; i++) {
		calendar.push({
			date: lastSundayOfPreviousMonth.add(i, 'day'),
			isFirstMonthDay: i === 0,
			isLastMonthDay: i === daysInMonth,
			holidays: [],
			tasks: [],
		});
	}

	// Добавляем дни текущего месяца
	for (let i = 1; i <= daysInMonth; i++) {
		calendar.push({
			date: startOfMonth.date(i),
			isFirstMonthDay: i == 0,
			isLastMonthDay: i === daysInMonth,
			holidays: [],
			tasks: []
		});
	}

	// Добавляем дни следующего месяца, если месяц не заканчивается воскресеньем
	if( calendar[ calendar.length - 1].date.day() !== 6 ) {
		const daysToAdd = 7 - (calendar.length % 7);
		// Находим первое воскресенье следующего месяца
		const nextMonth = startOfMonth.add(1, 'month');
		const firstSundayOfNextMonth = nextMonth.startOf('month')

		for (let i = 0; i < daysToAdd; i++) {
			calendar.push({
				date: firstSundayOfNextMonth.add(i, 'day'),
				isFirstMonthDay: i === 0,
				isLastMonthDay: i === daysInMonth,
				holidays: [],
				tasks: []
			});
		}
	}

	return calendar;
}
