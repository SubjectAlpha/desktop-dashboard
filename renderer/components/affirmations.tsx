import React from "react";
import Affirmation from "../objects/affirmations";
import Marquee from "react-fast-marquee";
import { ipcRenderer } from "electron";

export const Affirmations = () => {
	const [affirmations, setAffirmations] = React.useState(
		new Array<Affirmation>()
	);

	const loadAffirmations = async (
		event,
		affirmations: Array<Affirmation>
	) => {
		if (affirmations) {
			affirmations.reverse();
			setAffirmations(affirmations);
		}
	};

	React.useEffect(() => {
		if (ipcRenderer) {
			ipcRenderer.send("affirmations-read");

			ipcRenderer.on("affirmations-read-reply", loadAffirmations);
			return () => {
				ipcRenderer.removeListener(
					"affirmations-read-reply",
					loadAffirmations
				);
			};
		}
	}, []);

	return (
		<div className="w-full p-5 text-2xl">
			<Marquee gradientColor={[255, 250, 255]}>
				{affirmations.map((affirmation) => (
					<span className="mr-4" key={affirmation.id}>
						{affirmation.contents}
					</span>
				))}
			</Marquee>
		</div>
	);
};
