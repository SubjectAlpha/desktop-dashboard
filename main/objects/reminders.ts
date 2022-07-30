import { ipcMain } from "electron";
import Store from "electron-store";
import Base from "./base";

export function loadListeners() {
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
	public title: string;
	public contents: string;
	public dateTime: string;
	public repeat: boolean;
	public repeatDays: number[];
	public snoozed: boolean;
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
		this.title = title;
		this.contents = contents;
		this.dateTime = dateTime.toLocaleDateString();
		this.repeat = repeat;
		this.repeatDays = repeatDays;
	}
}

enum ReminderStatus {
	Pending,
	Completed,
	Overdue,
}
