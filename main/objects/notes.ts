import { ipcMain } from "electron";
import Store from "electron-store";
import Base from "./base";

export function loadListeners() {
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
	public contents: string;
	/**
	 *
	 */
	constructor(contents: string, id?: string, dateAdded?: Date) {
		super(id, dateAdded);
		this.contents = contents;
	}
}
