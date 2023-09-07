import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import { NewTask, Task } from "../types/task.ts";


class TaskService {
	private dateFormat = 'DD.MM.YYYY'

	public getAllTasks(): { [key: string]: Task[] } {
		const tasks = localStorage.getItem( 'tasks' )

		if(!tasks) {
			return {}
		}

		return JSON.parse( tasks )
	}

	public getTasksByDay( date: Dayjs ): Task[] {
		const tasks = this.getAllTasks()

		const tasksByDate = tasks[ date.format( this.dateFormat ) ]

		if(!tasksByDate ) {
			return []
		}

		return tasksByDate.map(( task: Task ) => ({
			...task,
			date: dayjs(task.date)
		}))
	}

	public saveTask( task: Task | NewTask ) {
		const tasks = this.getAllTasks()

		if( !tasks[ task.date.format(this.dateFormat)] ) {
			tasks[ task.date.format(this.dateFormat)] = []
		}

		const tasksByDate = tasks[ task.date.format(this.dateFormat)]

		if( !task.id ) {
			tasksByDate.push( { ...task, id: uuidv4() } )
		} else {
			const index = tasksByDate.findIndex(( item ) => item.id === task.id)

			if( index === -1 ) {
				tasksByDate.push( { ...task as Task } )
			}

			tasksByDate[index] = task as Task
		}

		tasks[ task.date.format(this.dateFormat)] = [ ...tasksByDate ]

		localStorage.setItem(
			'tasks',
			JSON.stringify( { ...tasks, [ task.date.format(this.dateFormat) ]: [ ...tasksByDate ] } )
		)
	}

	public deleteTask( task: Task ) {
		const tasks = this.getTasksByDay( task.date ).filter(( item => item.id !== task.id ))

		localStorage.setItem(
			task.date.format( this.dateFormat ),
			JSON.stringify( tasks )
		)
	}
}

export const taskService = new TaskService()
