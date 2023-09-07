import styled from "styled-components";

const HolidayItem = styled.div`
  background: rgba(89, 89, 255, 0.4);
  padding: 5px;
  border-radius: 5px;
`

type HolidaysProps = {
	holidays: { title: string }[]
}
export const Holidays = ( { holidays }: HolidaysProps) => {
	return holidays.map(( holiday ) => (
			<HolidayItem key={holiday.title}>
				{ holiday.title }
			</HolidayItem>
		))
}
