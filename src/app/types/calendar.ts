import { Task } from "./task.ts";
import { Dayjs } from "dayjs";

export interface CalendarDay {
	date: Dayjs,
	tasks: Task[],
	holidays: { title: string, date: Dayjs } [],
	isLastMonthDay: boolean,
	isFirstMonthDay: boolean
}
