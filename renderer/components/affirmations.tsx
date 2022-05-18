import React from "react";
import Affirmation from "../objects/affirmations";
import Marquee from "react-fast-marquee";

export const Affirmations = () => {
	const [affirmations, setAffirmations] = React.useState(
		new Array<Affirmation>()
	);

	const affms = [
		"You look good today!",
		"You're doing great!",
		"I'm proud of you!",
	];

	return (
		<div className="border-2 border-sky-500 w-full p-5 text-2xl">
			<Marquee gradientColor={[17, 24, 39]}>
				{affms.map((affirmation, index) => {
					return (
						<span className="mr-4" key={index}>
							{affirmation}
						</span>
					);
				})}
			</Marquee>
		</div>
	);
};
