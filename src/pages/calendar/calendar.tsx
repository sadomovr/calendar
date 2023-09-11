import styled from "styled-components";
import { useCalendarFilter } from "./hooks";
import { useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Calendar, CalendarController, TaskModal } from "./components";
import { LabelModal } from "./components/LabelsModal/LabelModal.tsx";
import { useLabels } from "./components/LabelsModal/useLabels.tsx";
import { DaysContextProvider } from "./providers/DaysProvider.tsx";
import { NewTask, Task } from "../../app/types/task.ts";
import { ImportExportController } from "./components/ImportExportController";
import html2canvas from "html2canvas";

const CalendarPageContainer = styled.div`
	padding: 15px;
`

type TaskModalState = {
	isOpen: boolean,
	task: {
		id?: string
		title: string
		date: Dayjs
		labels: {
			id: string
			value: string
			color: string
		}[]
	}
}

const defaultTaskModalState: TaskModalState = {
	isOpen: false,
	task: {
		id: undefined,
		title: '',
		date: dayjs(),
		labels: [],
	}
}
export const CalendarPage = ( ) => {
	const filter = useCalendarFilter()
	const contentRef = useRef(null)

	const {
		labels,
		handleAddLabel,
		handleUpdateLabel,
		handleDeleteLabel
	} = useLabels()

	const [ taskModal, setTaskModal] = useState<TaskModalState>( defaultTaskModalState )
	const [ showLabelsModal, setShowLabelsModal ] = useState( false )

	const handleCreateOrEditTask = ( date: Dayjs, task?: Task | NewTask ) => {
		setTaskModal({
			isOpen: true,
			task: {
				id: task?.id,
				title: task?.title || '',
				labels: task?.labels || [],
				date: task?.date || date,
			},
		})
	}

	const handleDownloadImage = () => {
		const content = contentRef.current;

		if (!content) return;

		html2canvas(content, { useCORS: true })
			.then((canvas) => {
				const dataUrl = canvas.toDataURL('image/png')
				const link = document.createElement('a')

				link.href = dataUrl
				link.download = 'calendar.png'
				link.click()
			})
			.catch((error) => {
				console.error('Error converting HTML to image:', error);
			});
	};

	const handleOpenLabelsModal = ( ) => {
		setShowLabelsModal( true )
	}

	const handleCloseLabelsModal = ( ) => {
		setShowLabelsModal( false )
	}

	const handleCloseModal = () => {
		setTaskModal( defaultTaskModalState )
	}

	return (
		<CalendarPageContainer>
			<DaysContextProvider
				text={filter.text}
				labels={filter.labels}
				month={filter.month}
				year={filter.year}
			>
				<CalendarController
					filter={filter}
					labels={labels}
					handleOpenLabelsModal={handleOpenLabelsModal}
				/>
				<Calendar
					handleCreateOrEditTask={handleCreateOrEditTask}
				/>

				<ImportExportController handleDownload={handleDownloadImage} />

				{ taskModal.isOpen ? (
					<TaskModal
						isOpen={taskModal.isOpen}
						onClose={handleCloseModal}
						task={taskModal.task}
						labels={labels}
					/>
				) : null }
				{ showLabelsModal ? (
					<LabelModal
						labels={labels}
						isOpen={showLabelsModal}
						onClose={handleCloseLabelsModal}
						handleAdd={handleAddLabel}
						handleUpdate={handleUpdateLabel}
						handleDelete={handleDeleteLabel}
					/>
				): null }
			</DaysContextProvider>
		</CalendarPageContainer>
	)
}
