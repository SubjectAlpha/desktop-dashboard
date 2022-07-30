import { app, ipcMain, screen } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import Store from "electron-store";
import Reminder, {
	loadListeners as loadReminderListeners,
} from "./objects/reminders";
import Note, { loadListeners as loadNoteListeners } from "./objects/notes";
import Affirmation, {
	loadListeners as loadAffirmationListeners,
} from "./objects/affirmations";
import OAuthHandler, {
	loadListeners as loadOAuthListeners,
} from "./helpers/oauthHandler";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
	serve({ directory: "app" });
} else {
	app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
	await app.whenReady();

	const mainWindow = createWindow("main", {
		fullscreen: false,
		frame: false,
		resizable: true,
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
	if (firstRun == undefined || firstRun == true) {
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
			new Date(2022, 1, 28, 9),
			true,
			[0, 3, 5, 6]
		);
		store.set("reminders", [defaultReminder]);
	}

	ipcMain.on("quit-app", () => {
		app.quit();
	});

	ipcMain.on("minimize-app", () => {
		mainWindow.minimize();
	});

	ipcMain.on("maximize-app", () => {
		if (mainWindow.isMaximized()) {
			mainWindow.unmaximize();
		} else {
			mainWindow.maximize();
		}
	});

	ipcMain.on("open-settings", (e, arg) => {
		let settingsPreload = {
			displayCount: screen.getAllDisplays().length,
		};

		e.reply("settings-loaded", settingsPreload);
	});

	loadOAuthListeners();
	loadAffirmationListeners();
	loadReminderListeners();
	loadNoteListeners();
})();

app.on("window-all-closed", () => {
	app.quit();
});
