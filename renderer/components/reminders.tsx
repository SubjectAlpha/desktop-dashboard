import React from "react";
import Reminder from "../objects/reminders";
import { ipcRenderer } from "electron";
import { BlueButton } from "./utility/button";
import TextArea from "./utility/textarea";
import DatePicker from "./utility/datepicker";

export const Reminders = () => {
	const [reminderText, setReminderText] = React.useState("");
	const [reminders, setReminders] = React.useState(new Array<any>());

	React.useEffect(() => {
		if (ipcRenderer) {
			ipcRenderer.send("reminders-read");
		}
	}, []);

	React.useEffect(() => {
		const loadReminders = async (event, reminders: Reminder[]) => {
			if (reminders) {
				reminders.reverse();
				setReminders([...reminders]);
			}
		};

		if (ipcRenderer) {
			ipcRenderer.on("reminders-read-reply", loadReminders);
			return () => {
				ipcRenderer.removeListener(
					"reminders-read-reply",
					loadReminders
				);
			};
		}
	}, [reminders]);

	const saveReminders = () => {
		let newReminders = [...reminders, { text: reminderText }];
		ipcRenderer.send("reminders-save", ...reminders);
	};

	return (
		<div className="border-2 p-2">
			<h2 className="font-medium text-3xl">Reminders</h2>
			<hr />
			<div className="mt-2 mb-2 flex flex-row">
				<div className="basis-1/2">
					<TextArea
						value={reminderText}
						onChange={(e) => setReminderText(e.target.value)}
					/>
				</div>
				<div className="flex flex-row basis-1/2 ml-2">
					<div className="flex flex-col">
						<h3>Notification Date/Time</h3>
						<DatePicker onChange={(e) => {}} />
					</div>
					<label>
						Remind Me?
						<input style={{ color: "black" }} type={"checkbox"} />
					</label>
					<BlueButton onClick={saveReminders} text="Save Reminder" />
				</div>
			</div>
			<div className="flex flex-col mt-2">
				{reminders.map((reminder) => (
					<div
						className="p-3 m-2 bg-sky-700 basis-full"
						key={reminder._id}
					>
						{reminder._contents}
					</div>
				))}
			</div>
		</div>
	);
};
