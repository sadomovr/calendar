import { createContext, useContext, useEffect, useState } from "react";
import { generateCalendar } from "../../../app/utils/date.ts";
import { taskService } from "../../../app/services/task.service.ts";
import { CalendarDay } from "../../../app/types/calendar.ts";
import { NewTask, Task } from "../../../app/types/task.ts";
import dayjs, { Dayjs } from "dayjs";
import { holidaysService } from "../../../app/services/holidays.service.ts";
import { MultiValue } from "react-select";
import { Label } from "../../../app/types/labels.ts";

type DayContext = {
	days: CalendarDay[]
	handleAddOrEditTask: ( task: Task | NewTask ) => void
	handleDeleteTask: ( task: Task ) => void
}

const DaysContext = createContext<DayContext | null>( null )

type DaysContextProvidersProps = {
	children: React.ReactNode
	month: number,
	year: number
	text: string,
	labels: MultiValue<Label>
}

export const DaysContextProvider = ({ text, labels, month, year, children }: DaysContextProvidersProps ) => {
	const [ days, setDays ] = useState(
		generateCalendar(month, year)
			.map(( day ) => ({
				...day,
				tasks: taskService.getTasksByDay( day.date ),
			}),)
	)
	useEffect(() => {
		const getCalendar = async () => {
			const holidays = await holidaysService.getHolidays( year, 'ua' )
			const holidaysByDay = holidaysService.convertToHolidaysByDay( holidays )

			setDays(
				generateCalendar(month, year)
					.map(( day ) => {
						const holidays = ( holidaysByDay[day.date.format('DD.MM.YYYY') ] ?? [] )
							.map(( day ) => ({ title: day.localName, date: dayjs(day.date )}))

						let tasks = taskService.getTasksByDay( day.date )
							.filter( ( task ) => task.title.includes( text ))

						if( labels.length ) {
							tasks = tasks.filter( ( task ) => task.labels.some((label) =>
								labels.some(( filterLabel ) => filterLabel.id === label.id)
							))
						}

						return { ...day, tasks, holidays, }
					},)
			)
		}

		getCalendar()
	}, [ month, year, text, labels ])
	const updateDay = ( date: Dayjs ) => {
		setDays(( prev ) => {
			const format = 'MM.DD.YYYY'
			const index = prev
				.findIndex( item => item.date.format(format) === date.format(format) )

			prev[index] = {
				...prev[index],
				tasks: taskService.getTasksByDay( date ),
			}

			return [ ...prev, ]
		})
	}

	const handleAddOrEditTask = ( task: NewTask ) => {
		taskService.saveTask( task )

		updateDay( task.date )
	}
	const handleDeleteTask = ( task: Task ) => {
		taskService.deleteTask( task )

		updateDay( task.date )
	}

	return (
		<DaysContext.Provider
			value={{
				days,
				handleAddOrEditTask,
				handleDeleteTask,
			}}
		>
			{ children }
		</DaysContext.Provider>
	)
}

export const useDaysContext = ( ) => {
	const context = useContext( DaysContext )

	if(!context) {
		throw new Error(
			"useDaysContext must be used within a DaysContext"
		)
	}

	return context
}
