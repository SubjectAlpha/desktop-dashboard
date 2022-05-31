import { ipcMain } from "electron";
import Store from "electron-store";
import Base from "./base";

export function loadFunctions() {
	if (ipcMain) {
		ipcMain.on("notes-save", (event, notes: Array<Note>) => {
			const store = new Store();
			store.set("notes", notes);
		});

		ipcMain.on("notes-read", (event, arg) => {
			const store = new Store();
			event.reply("notes-read-reply", store.get("notes"));
		});
	}
}

export default class Note extends Base {
	private _contents: string;
	/**
	 *
	 */
	constructor(contents: string, id?: string, dateAdded?: Date) {
		super(id, dateAdded);
		this._contents = contents;
	}

	set contents(value: string) {
		this._contents = value;
	}

	get contents(): string {
		return this._contents;
	}
}
