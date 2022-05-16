import { ipcMain } from "electron";
import Store from "electron-store";
import Base from "./base";

export function loadFunctions() {
	ipcMain.on("notes-save", (event, notes: Note[]) => {
		const store = new Store();
		store.set("notes", notes);
	});

	ipcMain.on("notes-read", (event, arg) => {
		const store = new Store();
		event.reply("notes-read-reply", store.get("notes"));
	});
}

export default class Note extends Base {
	private _contents: string;
	/**
	 *
	 */
	constructor(id?: string, dateAdded?: Date, contents?: string) {
		super(id, dateAdded);
	}

	set contents(value: string) {
		this._contents = value;
	}

	get contents(): string {
		return this._contents;
	}
}
