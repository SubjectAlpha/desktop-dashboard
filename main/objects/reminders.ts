import { ipcMain } from "electron";
import Store from "electron-store";
import Base from "./base";

export function loadFunctions() {
	if (ipcMain) {
		ipcMain.on("reminders-save", (event, reminders) => {
			const store = new Store();
			store.set("reminders", reminders);
		});

		ipcMain.on("reminders-read", (event, arg) => {
			const store = new Store();
			event.reply("reminders-read-reply", store.get("reminders"));
		});
	}
}

export default class Reminder extends Base {
	private _title: string;
	private _contents: string;
	private _dateTime: string;
	private _repeat: boolean;
	private _repeatDays: number[];
	private _notified: boolean;
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
		this._dateTime = dateTime.toLocaleDateString();
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
		return this._repeat;
	}

	set repeat(value: boolean) {
		this._repeat = value;
	}

	get repeatDays(): number[] {
		return this._repeatDays;
	}

	set notified(notified: boolean) {
		this._notified = notified;
	}

	get notified(): boolean {
		return this._notified;
	}
}

enum ReminderStatus {
	Pending,
	Completed,
	Overdue,
}
