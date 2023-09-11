import styled from "styled-components";
import dayjs from "dayjs";
import { Button } from "../../../../app/ui/Button";
import Select, { MultiValue } from "react-select";
import { Label } from "../../../../app/types/labels.ts";
import { Input } from "../../../../app/ui/input";

const CalendarControllerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 15px;
`

const TasksFilters = styled.div`
	display: flex;
	gap: 5px;
`

const DateController = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-content: center;
	align-items: center;
`

const DateControllerTitle = styled.div`
	width: 144px;
	font-size: 18px;
	font-weight: bold;
	text-align: center;
`

type CalendarControllerProps = {
	filter: {
		month: number
		year: number
		labels: MultiValue<Label>
		text: string
		handleChangeLabels: ( value: MultiValue<Label> ) => void
		handleChangeText: ( value: string ) => void
		handleChangeMonth: ( value: number ) => void
	}
	labels: Label[]
	handleOpenLabelsModal: ( ) => void
}

export const CalendarController = ({
	filter,
	labels,
	handleOpenLabelsModal
}: CalendarControllerProps ) => {
	const date = dayjs(`${filter.month}.01.${filter.year}`)

	const options = labels.map(( label ) => ({
		id: label.id,
		value: label.id,
		label: label.value,
		color: label.color
	}))

	return (
		<CalendarControllerContainer>
			<TasksFilters>
				<Input
					placeholder="Filtering by task"
					value={filter.text}
					onChange={( e ) => filter.handleChangeText(e.target.value)}
				/>
				<Select
					value={filter.labels}
					isMulti
					name="labels"
					options={options}
					onChange={( values ) => filter.handleChangeLabels( values )}
				/>
			</TasksFilters>

			<DateController>
				<Button
					onClick={() => filter.handleChangeMonth( -1 )}
				>
					{ '<' }
				</Button>

				<DateControllerTitle>
					{ date.format('MMMM')} { date.format('YYYY')}
				</DateControllerTitle>

				<Button
					onClick={() => filter.handleChangeMonth( 1 )}
				>
					{ '>' }
				</Button>

			</DateController>

			<Button onClick={handleOpenLabelsModal}>
				Manage labels
			</Button>
		</CalendarControllerContainer>
	)
}
