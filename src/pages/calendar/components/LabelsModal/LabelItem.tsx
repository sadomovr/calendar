import { ChangeEvent, useState } from "react";
import { Button } from "../../../../app/ui/Button";
import { Label, NewLabel } from "../../../../app/types/labels.ts";
import styled from "styled-components";
import { color } from "../../../../app/constants/color.ts";
import Select, { SingleValue } from "react-select";
import { Input } from "../../../../app/ui/input";

const LabelItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
  width: 100%;
`

const LabelItemInputs = styled.div`
	display: flex;
	align-items: center;
	gap: 10px
`

const LabelItemColor = styled.div<{ color: string}>`
	width: 100px;
	height: 25%;
	border-radius: 10px;
	background: ${p => p.color}
`

const LabelItemActions = styled.div`
	display: flex;
	gap: 10px;
`

type LabelItemProps = {
	id?: string
	value: string
	labelColor: string
	isEditing?: boolean
	handleDelete: ( id: string ) => void
	handleAdd: ( label: NewLabel ) => void
	handleUpdate: ( label: Label ) => void
}

export const LabelItem = (
	{ id, value, labelColor, handleAdd, handleUpdate, handleDelete }: LabelItemProps
) => {
	const [ isEditing, setIsEditing ] = useState( !id )
	const [ editingLabel, setEditingLabel ] = useState({ value, color: labelColor } )


	const options = (
		Object.keys( color.label ) as Array<keyof typeof color.label>
	).map( ( key: keyof typeof color.label) => ({
		label: key,
		value: color.label[key],
	}))


	const handleChangeMode = ( ) => {
		setIsEditing( ( prev ) => !prev )
	}

	const handleChangeColor = (
		value: SingleValue<{ value: string, label: string}>
	) => {
		setEditingLabel(( prev ) => ({...prev, color: value?.label || '' }))
	}

	const handleChangeName = ( e: ChangeEvent<HTMLInputElement> ) => {
		setEditingLabel(( prev ) => ({ ...prev, value: e.target.value }))
	}

	const handleReset = ( ) => {
		setEditingLabel({ color: '', value: '' })
	}

	return (
		<LabelItemContainer>
			<LabelItemInputs>
				{ !isEditing ? (
					<>
						<div>
							{ value }
						</div>
						<LabelItemColor color={labelColor} />
					</>
				) : (
					<>
						<Input
							id="name"
							placeholder="Name"
							value={editingLabel.value}
							onChange={handleChangeName}
						/>

						<Select
							defaultValue={{ value: color.label[ editingLabel.color as keyof typeof color.label ], label: editingLabel.color }}
							name="color"
							placeholder="Choose color"
							options={options}
							onChange={handleChangeColor}
						/>
					</>
				)}
			</LabelItemInputs>

			<LabelItemActions>
				{ isEditing ? (
					<Button
						onClick={() => id ? handleUpdate({ id, ...editingLabel }) : handleAdd( editingLabel ) }
					>
						{ id ? 'Save' : 'Add' }
					</Button>
				) : (
					<Button
						onClick={handleChangeMode}
					>
						Edit
					</Button>
				) }
				<Button
					color="error"
					onClick={() => id ? handleDelete( id ) : handleReset() }
				>
					{ id? 'Delete' : 'Reset' }
				</Button>
			</LabelItemActions>
		</LabelItemContainer>
	)
}
