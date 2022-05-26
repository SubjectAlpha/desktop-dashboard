import React from "react";
import Affirmation from "../objects/affirmations";
import Marquee from "react-fast-marquee";
import { ipcRenderer } from "electron";

export const Affirmations = () => {
	const [affirmations, setAffirmations] = React.useState(new Array<any>());

	React.useEffect(() => {
		const loadAffirmations = async (event, affirmations: Affirmation[]) => {
			if (affirmations) {
				affirmations.reverse();
				setAffirmations([...affirmations]);
			}
		};

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
		<div className="border-2 border-sky-500 w-full p-5 text-2xl">
			<Marquee gradientColor={[17, 24, 39]}>
				{affirmations.map((affirmation) => {
					return (
						<span className="mr-4" key={affirmation._id}>
							{affirmation._contents}
						</span>
					);
				})}
			</Marquee>
		</div>
	);
};
