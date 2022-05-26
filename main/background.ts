import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import Store from "electron-store";
import Reminder, {
	loadFunctions as loadReminderFunctions,
} from "./objects/reminders";
import Note, { loadFunctions as loadNoteFunctions } from "./objects/notes";
import Affirmation, {
	loadFunctions as loadAffirmationFunctions,
} from "./objects/affirmations";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
	serve({ directory: "app" });
} else {
	app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
	await app.whenReady();

	const mainWindow = createWindow("main", {
		fullscreen: true,
		frame: false,
	});

	if (isProd) {
		await mainWindow.loadURL("app://./home.html");
	} else {
		const port = process.argv[2];
		await mainWindow.loadURL(`http://localhost:${port}/home`);
		mainWindow.webContents.openDevTools();
	}

	const store = new Store();
	const firstRun = store.get("firstRun");
	if (firstRun == undefined || firstRun == true || true) {
		store.set("firstRun", false);

		const affirmations: Array<Affirmation> = [
			new Affirmation("You are awesome!"),
			new Affirmation("You look good today!"),
			new Affirmation("You're doing great!"),
			new Affirmation("I'm proud of you!"),
		];
		store.set("affirmations", affirmations);

		const defaultNote = new Note(
			"This is the default note. You can create more above this."
		);
		store.set("notes", [defaultNote]);

		const defaultReminder = new Reminder(
			"Default Reminder",
			"This your reminder to create more reminders.",
			new Date(2, 28, 2022),
			false
		);
		store.set("reminders", [defaultReminder]);
	}
})();

app.on("window-all-closed", () => {
	app.quit();
});

ipcMain.on("quit-app", () => {
	app.quit();
});

loadAffirmationFunctions();
loadReminderFunctions();
loadNoteFunctions();
