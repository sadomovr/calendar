
export interface Holiday {
	"date": string;
	"localName": string;
	"name": string;
	"countryCode": string;
	"fixed": boolean;
	"global": boolean;
	"counties": null;
	"launchYear": null;
	"types": string[]
}

export interface HolidayByDay {
	[key: string]: Holiday[]
}
