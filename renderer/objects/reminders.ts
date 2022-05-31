import Base from "./base";

export default class Reminder extends Base {
	private _title: string;
	private _contents: string;
	private _dateTime: string;
	private _repeat: boolean;
	private _repeatDays: number[];
	/**
	 *
	 */
	constructor(
		title: string,
		contents: string,
		dateTime?: Date,
		repeat?: boolean,
		repeatDays?: number[],
		id?: string,
		dateAdded?: Date
	) {
		super(id, dateAdded);
		this._title = title;
		this._contents = contents;
		this._dateTime = dateTime.toLocaleString();
		this._repeat = repeat;
		this._repeatDays = repeatDays;
	}

	get title(): string {
		return this._title;
	}

	set title(value: string) {
		this._title = value;
	}

	get contents(): string {
		return this._contents;
	}

	set contents(value: string) {
		this._contents = value;
	}

	get dateTime(): string {
		return this._dateTime;
	}

	set dateTime(value: Date | string) {
		if (typeof value === "string") {
			let newDate = new Date(value);
			this._dateTime = newDate.toLocaleString();
		} else {
			this._dateTime = value.toLocaleString();
		}
	}

	get repeat(): boolean {
		return this.repeat;
	}

	set repeat(value: boolean) {
		this._repeat = value;
	}

	get repeatDays(): number[] {
		return this._repeatDays;
	}
}

enum ReminderStatus {
	Pending,
	Completed,
	Overdue,
}
