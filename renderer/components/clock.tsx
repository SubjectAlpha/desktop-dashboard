import React from "react";

export const Clock = () => {
	const [date, setDate] = React.useState(new Date());

	React.useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, [date]);

	return (
		<div>
			<h2>{date.toLocaleString()}</h2>
		</div>
	);
};
