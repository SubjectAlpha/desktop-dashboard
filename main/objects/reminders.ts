import { ipcMain } from "electron";
import Store from "electron-store";
import Base from "./base";

export function loadFunctions() {
	ipcMain.on("reminders-save", (event, reminders) => {
		const store = new Store();
		store.set("reminders", reminders);
	});

	ipcMain.on("reminders-read", (event, arg) => {
		const store = new Store();
		event.reply("reminders-read-reply", store.get("reminders"));
	});
}

export default class Reminder extends Base {
	private _title: string;
	private _contents: string;
	private _dateTime: Date;
	private _repeat: boolean;
	private _repeatDays: number;
	/**
	 *
	 */
	constructor(
		title: string,
		contents: string,
		dateTime?: Date,
		repeat?: boolean,
		repeatDays?: number,
		id?: string,
		dateAdded?: Date
	) {
		super(id, dateAdded);
		this._title = title;
		this._contents = contents;
		this._dateTime = dateTime;
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

	get dateTime(): Date {
		return this._dateTime;
	}

	set dateTime(value: Date) {
		this._dateTime = value;
	}

	get repeat(): boolean {
		return this.repeat;
	}

	set repeat(value: boolean) {
		this._repeat = value;
	}

	get repeatDays(): number {
		return this._repeatDays;
	}
}

enum ReminderStatus {
	Pending,
	Completed,
	Overdue,
}
