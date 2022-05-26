import React from "react";
import { ipcRenderer } from "electron";
import { BlueButton, RedButton } from "./utility/button";
import { FaSignOutAlt, FaCog } from "react-icons/fa";

export default function ControlPanel() {
	const quitApp = () => {
		ipcRenderer.send("quit-app");
	};

	return (
		<div className="border-2 h-1/4 p-3">
			<div className="flex flex-row w-full text-center">
				<BlueButton href="/settings">
					<FaCog />
				</BlueButton>

				<RedButton onClick={quitApp}>
					<FaSignOutAlt />
				</RedButton>
			</div>
		</div>
	);
}
