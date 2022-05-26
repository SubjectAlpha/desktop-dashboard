import React from "react";
import Reminder from "../objects/reminders";
import { ipcRenderer } from "electron";
import { BlueButton } from "./utility/button";
import TextArea from "./utility/textarea";

export const Reminders = () => {
	const [reminderText, setReminderText] = React.useState("");
	const [reminders, setReminders] = React.useState(new Array<Reminder>());

	React.useEffect(() => {}, [reminders]);

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
						<input
							style={{ color: "black" }}
							type={"datetime-local"}
						/>
					</div>
					<label>
						Remind Me?
						<input style={{ color: "black" }} type={"checkbox"} />
					</label>
					<BlueButton onClick={saveReminders} text="Save Reminder" />
				</div>
			</div>
			{reminders.map((reminder) => {
				return (
					<div key={reminder.id}>
						<span>{reminder.contents}</span>
					</div>
				);
			})}
		</div>
	);
};
