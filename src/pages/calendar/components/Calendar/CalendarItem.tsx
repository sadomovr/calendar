import styled from "styled-components";
import { Dayjs } from "dayjs";
import { ReactNode } from "react";

const CalendarItemHeader = styled.div`
	font-weight: bold;
`

const TasksContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	height: 100%;
	width: 100%;
	padding: 15px 0;
`

type CalendarItemProps = {
	date: Dayjs;
	children: ReactNode,
	dateHeaderFormat: string
}

export const CalendarItem = ( { children, date, dateHeaderFormat, }: CalendarItemProps ) => {
	return (
		<>
			<div style={{ width: '100%', height: '100%' }}>
				<CalendarItemHeader>
					{ date.format(dateHeaderFormat) }
				</CalendarItemHeader>
				<TasksContainer>
					{ children }
				</TasksContainer>
			</div>
		</>

	)
}
