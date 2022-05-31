import React from "react";

export const Clock = () => {
	const weekday = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const [date, setDate] = React.useState(new Date());

	React.useEffect(() => {
		const interval = setInterval(() => {
			const date = new Date();

			setDate(date);
		}, 1000);

		return () => clearInterval(interval);
	}, [date]);

	return (
		<div className="border-2 border-white-500 p-2 text-4xl">
			<h2>{weekday[date.getDay()]}</h2>
			<h2>{date.toLocaleString()}</h2>
		</div>
	);
};
