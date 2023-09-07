import { Holiday, HolidayByDay } from "../types/holidays.ts";
import dayjs from "dayjs";


class HolidaysService {
	private url = 'https://date.nager.at/api/v3/PublicHolidays/'

	cache: { [key: string | number ]: Holiday[] }  = {}

	public async getHolidays( year: number | string, countryCode: string ): Promise<Holiday[]> {
		const cacheData = this.cache[year]

		if( cacheData  ) {
			return cacheData
		}

		const result = await fetch(`${this.url}${year}/${countryCode}`)

		return await result.json()
	}

	public convertToHolidaysByDay( holidays: Holiday[] ) {
		return holidays.reduce( (prev: HolidayByDay, next) => {
			const dayjsDate = dayjs( next.date )
			const day = dayjsDate.format('DD.MM.YYYY')

			if ( !prev[day] ) {
				return { ...prev, [day]: [ next ] }
			}

			return { ...prev, [day]: [ ...prev[day], next ] }
		}, {})
	}
}
export const holidaysService = new HolidaysService()
