import styled from "styled-components";
import { MouseEvent, useRef } from "react";
import { Task } from "../../../../app/types/task.ts";
import { useDaysContext } from "../../providers/DaysProvider.tsx";
import { useDrag, useDrop } from "react-dnd";
import { Dayjs } from "dayjs";

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
	index: number
}

export const DayTask = ( { task, index, onClick }: Props ) => {
	const { handleMoveTask, handleChangeTaskPosition } = useDaysContext()

	const ref = useRef<HTMLDivElement>(null);

	const [, drop] = useDrop({
		accept: "Our first type",
		hover(item: Task & { index: number }, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item?.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();

			if( !clientOffset ) {
				return;
			}

			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			handleChangeTaskPosition(task, dragIndex, hoverIndex)
		}
	});

	const [, drag] = useDrag({
		type: "Our first type",
		item: { ...task, index, type: "Our first type" },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult();

			if (dropResult) {
				const { name } = dropResult as { name: Dayjs };

				handleMoveTask(name, item)
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});

	drag(drop(ref));

	return (
		<DayTaskContainer
			onClick={onClick}
			ref={ref}
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
