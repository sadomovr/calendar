
export interface Label {
	id: string
	value: string
	color: string
}

export interface NewLabel extends Omit<Label, 'id'> {
	id?: string
}
