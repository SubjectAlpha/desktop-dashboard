import React from "react";
import Reminder from "../objects/reminders";
import { ipcRenderer } from "electron";
import { BlueButton } from "./button";

export const Reminders = () => {
	const [reminderText, setReminderText] = React.useState("");
	const [reminders, setReminders] = React.useState(new Array<Reminder>());

	React.useEffect(() => {}, [reminders]);

	const saveReminders = () => {
		let newReminders = [...reminders, { text: reminderText }];
		ipcRenderer.send("reminders-save", ...reminders);
	};

	return (
		<div className="border-2 h-3/4 p-2">
			<h2>Reminders</h2>
			{reminders.map((reminder) => {
				return (
					<div key={reminder.id}>
						<span>{reminder.contents}</span>
					</div>
				);
			})}
			<hr />
			<textarea
				style={{ color: "black" }}
				className="w-full"
				value={reminderText}
				onChange={(e) => setReminderText(e.target.value)}
			/>
			<BlueButton onClick={saveReminders} text="Add" />
		</div>
	);
};
