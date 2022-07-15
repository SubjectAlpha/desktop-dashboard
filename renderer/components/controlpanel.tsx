import React from "react";
import { ipcRenderer } from "electron";
import { BlueButton, RedButton } from "./utility/button";
import {
	FaCog,
	FaWindowMaximize,
	FaWindowMinimize,
	FaWindowClose,
	FaArrowsAlt,
} from "react-icons/fa";

const draggableStyle: any = {
	WebkitUserSelect: "none",
	WebkitAppRegion: "drag",
};

export default function ControlPanel() {
	const minimizeApp = () => {
		if (ipcRenderer) {
			ipcRenderer.send("minimize-app");
		}
	};

	const maximizeApp = () => {
		if (ipcRenderer) {
			ipcRenderer.send("maximize-app");
		}
	};

	const quitApp = () => {
		if (ipcRenderer) {
			ipcRenderer.send("quit-app");
		}
	};

	return (
		<div className="border-2 h-1/4 p-3">
			<div className="flex flex-row w-full text-center">
				<BlueButton href="/settings">
					<FaCog />
				</BlueButton>
				<BlueButton onClick={minimizeApp}>
					<FaWindowMinimize />
				</BlueButton>
				<BlueButton onClick={maximizeApp}>
					<FaWindowMaximize />
				</BlueButton>
				<BlueButton style={draggableStyle}>
					<FaArrowsAlt />
				</BlueButton>
				<RedButton onClick={quitApp}>
					<FaWindowClose />
				</RedButton>
			</div>
		</div>
	);
}
