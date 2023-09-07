import { ChangeEvent, useState } from "react"
import Select, { MultiValue } from "react-select"
import { Dayjs } from "dayjs"
import { Modal, ModalFooter, ModalContainer, ModalHeader, ModalContent } from "../../../../app/ui/Modal"
import { Button } from "../../../../app/ui/Button";
import { useDaysContext } from "../../providers/DaysProvider.tsx";
import { Task } from "../../../../app/types/task.ts";
import { Label } from "../../../../app/types/labels.ts";
import { Input } from "../../../../app/ui/input/Input.tsx";

type TaskModalProps = {
	isOpen: boolean
	onClose: () => void
	task: {
		id?: string,
		title: string,
		labels: { id: string, value: string, color: string }[]
		date: Dayjs,
	}
	labels: Label[]
}
export const TaskModal = ({ isOpen, onClose, task, labels }: TaskModalProps ) => {
	const { handleAddOrEditTask, handleDeleteTask } = useDaysContext()

	const [ taskTitle, setTaskTitle ] = useState( task.title || '')
	const [ selectedLabels, setSelectedLabels ] = useState<Label[]>( task.labels || [] )

	const handleChangeTaskTitle = ( e: ChangeEvent<HTMLInputElement> ) => {
		e.preventDefault()

		setTaskTitle( e.target.value )
	}

	const handleChangeLabels = ( values: MultiValue<Label> ) => {
		setSelectedLabels( [ ...values ] )
	}

	const options = labels.map((label ) => ({
		id: label.id,
		value: label.id,
		label: label.value,
		color: label.color
	}))

	const handleAddTask = ( ) => {
		handleAddOrEditTask( {
			...task,
			title: taskTitle,
			labels: selectedLabels,
		} )

		onClose()
	}

	const handleDelete = ( ) => {
		handleDeleteTask( task as Task )

		onClose()
	}

	if (!isOpen) {
		return null
	}

	return (
		<Modal>
			<ModalContainer>
				<ModalHeader>
					{task.id ? 'Editing' : 'Creating' } the task for { task.date.format('DD.MM.YYYY') }
				</ModalHeader>

				<ModalContent>
					<Input
						id="title"
						value={taskTitle}
						onChange={handleChangeTaskTitle}
					/>

					<Select
						value={selectedLabels}
						isMulti
						name="labels"
						options={options}
						onChange={handleChangeLabels}
					/>
				</ModalContent>

				<ModalFooter>
					{ task.id ? (
						<Button
							color="error"
							onClick={handleDelete}
						>
							Delete
						</Button>
					) : null }
					<Button onClick={onClose}>
						Close
					</Button>
					<Button
						color="success"
						onClick={handleAddTask}
					>
						{ task.id ? 'Save' : 'Add' }
					</Button>
				</ModalFooter>
			</ModalContainer>
		</Modal>
	)
}
