import styled from "styled-components";
import { MouseEvent } from "react";
import { Task } from "../../../../app/types/task.ts";

const DayTaskContainer = styled.div`
	padding: 5px;
	border-radius: 5px;
  background: white;
	color: black;
`

const DayTaskLabelsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin-bottom: 5px;
	gap: 5px;
`

const DayTaskLabel = styled.div`
	width: 30%;
	height: 8px;
	border-radius: 15px;
	background: ${p => p.color };
`

type Props = {
	onClick: ( e: MouseEvent<HTMLDivElement | HTMLAnchorElement> ) => void,
	task: Task,
}

export const DayTask = ( { task, onClick }: Props ) => {
	return (
		<DayTaskContainer
			onClick={onClick}
		>
			<DayTaskLabelsContainer>
				{ task.labels.map(( { color } ) => <DayTaskLabel key={color} color={color}/> ) }
			</DayTaskLabelsContainer>
			<div>
				{ task.title }
			</div>
		</DayTaskContainer>
	)
}
