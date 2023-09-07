import { Label } from "./labels.ts"
import { Dayjs } from "dayjs";

export interface Task {
	id: string,
	title: string,
	date: Dayjs,
	labels: Label[]
}

export interface NewTask extends Omit<Task, 'id' | 'index'> {
	id?: string
}
