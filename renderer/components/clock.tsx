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
			setDate(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, [date]);

	return (
		<div className="border-2 border-sky-500 p-2 text-5xl">
			<h2>{weekday[date.getDay()]}</h2>
			<h2>{date.toLocaleString()}</h2>
		</div>
	);
};
