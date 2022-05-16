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
	private repeat: boolean;
	private repeatDays: number;
	/**
	 *
	 */
	constructor(
		id?: string,
		dateAdded?: Date,
		title?: string,
		contents?: string,
		dateTime?: Date,
		repeat?: boolean,
		repeatDays?: number
	) {
		super(id, dateAdded);
		this._title = title;
		this._contents = contents;
		this._dateTime = dateTime;
		this.repeat = repeat;
		this.repeatDays = repeatDays;
	}
}
