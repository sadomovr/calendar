import { v4 as uuidv4 } from "uuid";
import { Label, NewLabel } from "../types/labels.ts";

export class LabelService {
	public getLabels(): Label[] {
		const labels = localStorage.getItem( 'labels' )

		if(!labels) {
			return []
		}

		return JSON.parse( labels )
	}

	public saveLabel( label: Label | NewLabel ) {
		const labels = this.getLabels()

		if( !label?.id ) {
			labels.push( { ...label, id: uuidv4() } )
		} else {
			const index = labels.findIndex(( item: Label ) => item.id === label.id)

			labels[index] = label as Label
		}


		this.saveAllLabels( labels )
	}

	public deleteLabel( id: string ) {
		const labels = this.getLabels().filter(( item => item.id !== id ))

		this.saveAllLabels( labels )
	}

	public saveAllLabels( labels: Label[] ) {
		localStorage.setItem(
			'labels',
			JSON.stringify( labels )
		)
	}
}

export const labelService = new LabelService()
