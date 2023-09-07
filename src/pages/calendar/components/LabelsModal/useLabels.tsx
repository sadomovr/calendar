import { labelService } from "../../../../app/services/label.service.ts";
import { useState } from "react";
import { NewLabel } from "../../../../app/types/labels.ts";

export const useLabels = ( ) => {
	const [ labels, setLabels ] = useState( labelService.getLabels() )

	const handleAddLabel = ( label: NewLabel ) => {
		labelService.saveLabel( label )

		setLabels( labelService.getLabels() )
	}

	const handleUpdateLabel = ( label: NewLabel ) => {
		labelService.saveLabel( label )

		setLabels( labelService.getLabels() )
	}

	const handleDeleteLabel = ( id: string ) => {
		labelService.deleteLabel( id )

		setLabels( labelService.getLabels() )
	}

	return {
		labels,
		handleAddLabel,
		handleUpdateLabel,
		handleDeleteLabel,
	}
}
