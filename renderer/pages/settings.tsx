import React from "react";
import { ipcRenderer } from "electron";
import Head from "next/head";
import Affirmation from "../objects/affirmations";
import { BlueButton, RedButton } from "../components/utility/button";
import { FaSave, FaTrash } from "react-icons/fa";
import TextArea from "../components/utility/textarea";

export default function Settings() {
	const [affirmationText, setAffirmationText] = React.useState("");
	const [affirmations, setAffirmations] = React.useState(
		new Array<Affirmation>()
	);

	React.useEffect(() => {
		if (ipcRenderer) {
			ipcRenderer.send("open-settings");
			ipcRenderer.send("affirmations-read");
		}
	}, []);

	React.useEffect(() => {
		const loadAffirmations = async (
			event,
			affirmations: Array<Affirmation>
		) => {
			if (affirmations) {
				affirmations.reverse();
				setAffirmations([...affirmations]);
			}
		};

		if (ipcRenderer) {
			ipcRenderer.on("affirmations-read-reply", loadAffirmations);
			return () => {
				ipcRenderer.removeListener(
					"affirmations-read-reply",
					loadAffirmations
				);
			};
		}
	}, [affirmations]);

	const saveAffirmations = () => {
		if (
			affirmationText !== "" &&
			affirmationText !== " " &&
			affirmationText !== undefined
		) {
			const newAffirmation = new Affirmation(affirmationText);
			let newAffirmations = [...affirmations, newAffirmation];
			ipcRenderer.send("affirmations-save", newAffirmations);
			setAffirmations(newAffirmations);
			setAffirmationText("");
		}
	};

	const deleteAffirmation = (affirmationId: string) => {
		const newAffirmations = affirmations.filter(
			(a) => a.id !== affirmationId
		);
		ipcRenderer.send("affirmations-save", newAffirmations);
		setAffirmations(newAffirmations);
	};

	return (
		<React.Fragment>
			<Head>
				<title>Desktop Dashboard - Settings</title>
			</Head>
			<div className="flex flex-row w-full mt-8">
				<div className="basis-1/4 mr-4 ml-4 text-center border-2">
					<BlueButton href="dashboard" text="Home" />
				</div>
				<div className="basis-3/4 mr-8">
					<div className="flex flex-row w-full">
						<div className="basis-3/4 flex flex-col text-2xl w-full text-center border-2">
							<div className="border-2">
								<h1>Application Settings</h1>
								<hr />
								<p>Start with system?</p>
								<p>Dark/Light Mode</p>
								<p>Snooze length</p>
							</div>

							<div className="border-2">
								<h1>Email Accounts</h1>
								<hr />
							</div>
						</div>
						<div className="basis-1/4">
							<div className="border-2">
								<h1>Manage Affirmations</h1>
								<hr />
								<div className="flex flex-row p-2">
									<div className="basis-3/4">
										<TextArea
											className="w-full"
											placeholder="Add an affirmation..."
											value={affirmationText}
											onChange={(e) =>
												setAffirmationText(
													e.target.value
												)
											}
										/>
									</div>
									<div className="basis-1/4">
										<BlueButton onClick={saveAffirmations}>
											<FaSave />
										</BlueButton>
									</div>
								</div>
								{affirmations.map((affirmation) => (
									<div
										className="p-2 m-2 secondary-item flex flex-row justify-between items-center"
										key={affirmation.id}
									>
										<div className="basis-3/4">
											{affirmation.contents}
										</div>
										<div className="basis-1/4">
											<RedButton
												onClick={() => {
													deleteAffirmation(
														affirmation.id
													);
												}}
											>
												<FaTrash />
											</RedButton>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
