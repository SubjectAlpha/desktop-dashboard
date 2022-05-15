import React from "react";
import Marquee from "react-fast-marquee";

export const Affirmations = () => {
	return (
		<div className="border-2 border-sky-500 w-full">
			<Marquee gradientColor={[17, 24, 39]}>
				Test...Test...Test...Test...Test...Test...Test...Test...Test...Test...Test...Test...
			</Marquee>
		</div>
	);
};
