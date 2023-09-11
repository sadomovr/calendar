import styled from "styled-components";
import { Dayjs } from "dayjs";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";

const CalendarItemHeader = styled.span<{isInCurrentMonth: boolean}>`
	font-weight: ${p => p.isInCurrentMonth ? 'bold' : undefined};
`

const CalendarItemNumberOfTasks = styled.span`
	font-size: 14px;
`

const TasksContainer = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  width: 100%;
  padding: 15px 0;
  background: ${p => p.color};
`

type CalendarItemProps = {
	date: Dayjs;
	children: ReactNode,
	dateHeaderFormat: string
	numberOfTasks: number
	isInCurrentMonth: boolean
}

export const CalendarItem = ( { children, date, dateHeaderFormat, numberOfTasks, isInCurrentMonth }: CalendarItemProps ) => {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: "Our first type",
		drop: () => ({ name: date }),
		collect: (monitor) => ({
			handlerId: monitor.getHandlerId(),
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		}),
		canDrop: () => true
	});

	const getBackgroundColor = (): string => {
		if (isOver) {
			if (canDrop) {
				return "rgb(188,251,255)";
			}
			if (!canDrop) {
				return "rgb(255,188,188)";
			}
		}

		return ''
	};

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<div>
				<CalendarItemHeader isInCurrentMonth={isInCurrentMonth}>
					{ date.format(dateHeaderFormat) }
				</CalendarItemHeader>
				{ numberOfTasks > 0 ? <CalendarItemNumberOfTasks> {numberOfTasks } card </CalendarItemNumberOfTasks> : null }
			</div>
			<TasksContainer
				ref={drop}
				color={getBackgroundColor()}
			>
				{ children }
			</TasksContainer>
		</div>
	)
}
