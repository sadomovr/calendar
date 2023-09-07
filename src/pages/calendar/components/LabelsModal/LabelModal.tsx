import { Modal, ModalContainer, ModalContent, ModalFooter, ModalHeader } from "../../../../app/ui/Modal";
import { Button } from "../../../../app/ui/Button";
import { LabelList } from "./LabelList.tsx";
import { LabelItem } from "./LabelItem.tsx";
import { Label, NewLabel } from "../../../../app/types/labels.ts";

type LabelModalProps = {
	isOpen: boolean
	onClose: () => void
	labels: Label[]
	handleDelete: ( id: string ) => void
	handleAdd: ( label: NewLabel ) => void
	handleUpdate: ( label: Label ) => void
}
export const LabelModal = (
	{ isOpen, onClose, labels, handleAdd, handleUpdate, handleDelete }: LabelModalProps
) => {
	if( !isOpen ) {
		return null
	}

	return (
		<Modal>
			<ModalContainer width="550px">
				<ModalHeader>
					Label management
				</ModalHeader>

				<ModalContent>
					<LabelList>
						<LabelItem
							value={''}
							labelColor="green"
							handleAdd={handleAdd}
							handleUpdate={handleUpdate}
							handleDelete={handleDelete}
						/>
						{ labels.map( ( label ) => (
							<LabelItem
								key={label.id}
								id={label.id}
								value={label.value}
								labelColor={label.color}
								handleAdd={handleAdd}
								handleUpdate={handleUpdate}
								handleDelete={handleDelete}
							/>
						) )}
					</LabelList>
				</ModalContent>

				<ModalFooter>
					<Button onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContainer>
		</Modal>
	)
}
