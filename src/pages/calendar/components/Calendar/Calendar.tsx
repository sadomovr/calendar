import styled from "styled-components";
import { MouseEvent } from "react";
import { Dayjs } from "dayjs";
import { Task } from "../../../../app/types/task.ts";
import { CalendarItem } from "./CalendarItem.tsx";
import { useDaysContext } from "../../providers/DaysProvider.tsx";
import { DayTask } from "./DayTask.tsx";

const CalendarGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: 1fr;
	grid-gap: 5px;
	margin-bottom: 20px;
`

const CalendarCard = styled.div`
  background: #c0c0c0;
  color: black;
  padding: 5px;
	min-height: 120px;
	min-width: 64px;
`

type CalendarProps = {
	handleCreateOrEditTask: ( date: Dayjs, task?: Task ) => void
}

export const Calendar = ( { handleCreateOrEditTask }: CalendarProps ) => {
	const { days } = useDaysContext()

	const handleClick = (
		e: MouseEvent<HTMLDivElement | HTMLAnchorElement>,
		date: Dayjs,
		task?: Task
	) => {
		e.stopPropagation()

		handleCreateOrEditTask( date, task )
	}

	const returnItemsForDay = ( tasks: Task[] ) => {
		return tasks.map(( task ) => (
			<DayTask
				key={task.id}
				task={task}
				onClick={( e ) => handleClick(e, task.date, task) }
			/>
		) )
	}

	return (
		<CalendarGrid>
			{ days.map(( item ) => (
				<CalendarCard
					key={item.date.format('DD.MM.YYYY')}
					onClick={() => handleCreateOrEditTask( item.date )}
				>
					<CalendarItem
						date={item.date}
						dateHeaderFormat={ ( item.isFirstMonthDay || item.isLastMonthDay ) ? 'MMM DD' : 'DD' }
					>
						{ returnItemsForDay( item.tasks )}
					</CalendarItem>
				</CalendarCard>
			) ) }
		</CalendarGrid>
	)
}
