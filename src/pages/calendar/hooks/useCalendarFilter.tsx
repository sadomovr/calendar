import { useState } from "react";
import dayjs from "dayjs";
import { MultiValue } from "react-select";
import { Label } from "../../../app/types/labels.ts";
export const useCalendarFilter = ( ) => {
	const [ textFiltering, setTextFiltering ] = useState('')
	const [ labelsFiltering, setLabelsFiltering ] = useState<MultiValue<Label>>([])

	const [ selectedMonth, setSelectedMonth ] = useState( dayjs().month() + 1 )
	const [ selectedYear, setSelectedYear ] = useState( dayjs().year() )

	const handleChangeMonth = ( value: number ) => {
		if( selectedMonth + value > 12 ) {
			setSelectedMonth(1)
			setSelectedYear(( prev ) => prev + 1)

			return
		}

		if( selectedMonth + value < 1 ) {
			setSelectedMonth(12)
			setSelectedYear(( prev ) => prev - 1)

			return
		}

		setSelectedMonth(( prev ) => prev + value)
	}

	const handleChangeText = ( value: string ) => {
		setTextFiltering( value )
	}

	const handleChangeLabels = ( values: MultiValue<Label> ) => {
		setLabelsFiltering( values )
	}

	return {
		text: textFiltering,
		labels: labelsFiltering,
		month: selectedMonth,
		year: selectedYear,
		handleChangeMonth,
		handleChangeText,
		handleChangeLabels,
	}
}
