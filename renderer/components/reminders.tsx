import React from "react";

export const Reminders = () => {
	const [reminders, setReminders] = React.useState([]);

	React.useEffect(() => {}, [reminders]);

	return (
		<div>
			<h2>Reminders</h2>
			{reminders.map((reminder, index) => {
				return (
					<div key={index}>
						<span>{reminder.text}</span>
					</div>
				);
			})}
		</div>
	);
};
