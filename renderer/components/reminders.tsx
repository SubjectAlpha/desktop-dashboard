import React from "react";
import { ipcRenderer } from "electron";

export const Reminders = () => {
	const [reminderText, setReminderText] = React.useState("");
	const [reminders, setReminders] = React.useState([]);

	React.useEffect(() => {}, [reminders]);

	const saveReminders = () => {
		ipcRenderer.send("reminders-save", ...reminders);
	};

	return (
		<React.Fragment>
			<h2>Reminders</h2>
			{reminders.map((reminder, index) => {
				return (
					<div key={index}>
						<span>{reminder.text}</span>
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
		</React.Fragment>
	);
};
