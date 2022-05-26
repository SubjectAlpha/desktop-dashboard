import Store from "electron-store";
import Base from "./base";
import { ipcMain } from "electron";

export function loadFunctions() {
	if (ipcMain) {
		ipcMain.on(
			"affirmations-save",
			(event, affirmations: Array<Affirmation>) => {
				console.log(affirmations);
				const store = new Store();
				store.set("affirmations", [...affirmations]);
			}
		);

		ipcMain.on("affirmations-read", (event, arg) => {
			const store = new Store();
			event.reply("affirmations-read-reply", store.get("affirmations"));
		});
	}
}

export default class Affirmation extends Base {
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
