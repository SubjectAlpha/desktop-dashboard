import Store from "electron-store";
import Base from "./base";
import { ipcMain } from "electron";

export function loadListeners() {
	if (ipcMain) {
		ipcMain.on(
			"affirmations-save",
			(event, affirmations: Array<Affirmation>) => {
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
	public contents: string;
	/**
	 *
	 */

	constructor(contents: string, id?: string, dateAdded?: Date) {
		super(id, dateAdded);
		this.contents = contents;
	}
}
