import React from "react";
import { BlueButton } from "./button";

export const Notes = () => {
	const [notes, setNotes] = React.useState([]);
	const [text, setText] = React.useState("");

	return (
		<div className="border-2 h-3/4 p-2">
			<h1>Notes</h1>
			<br />
			<textarea
				style={{ color: "black" }}
				className="w-full"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<BlueButton text="Save Note" />
		</div>
	);
};
