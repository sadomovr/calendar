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

		this.saveAllTasks( { ...tasks, [ task.date.format(this.dateFormat) ]: [ ...tasksByDate ] } )
	}

	public deleteTask( task: Task ) {
		const tasks = this.getAllTasks()
		const tasksByDate = this.getTasksByDay( task.date ).filter(( item => item.id !== task.id ))

		tasks[ task.date.format(this.dateFormat)] = [ ...tasksByDate ]

		this.saveAllTasks( tasks )
	}

	public moveTask( date: Dayjs, task: Task ) {
		this.deleteTask( task )
		this.saveTask( { ...task, date } )
	}

	public changeTaskPosition(task: Task, dragIndex: number, hoverIndex: number ) {
		const tasksByDay = this.getTasksByDay( task.date )
		const tasks = this.getAllTasks()


		const dragItem = tasksByDay[dragIndex];

		if (dragItem) {
			const coppiedArray = [ ...tasksByDay ]

			const prevItem = coppiedArray.splice(hoverIndex, 1, dragItem);
			coppiedArray.splice(dragIndex, 1, prevItem[0]);

			tasks[ task.date.format(this.dateFormat)] = [ ...coppiedArray ]

			this.saveAllTasks( tasks )
		}
	}

	public saveAllTasks(tasks: { [key:string]: Task[] } ) {
		localStorage.setItem('tasks', JSON.stringify( tasks ) )
	}
}

export const taskService = new TaskService()
