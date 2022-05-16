import React from "react";

export const Notes = () => {
	const [notes, setNotes] = React.useState([]);
	const [text, setText] = React.useState("");

	return (
		<div className="border-2 h-full p-2">
			<h1>Notes</h1>
			<br />
			<textarea
				style={{ color: "black" }}
				className="w-full"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button className="btn btn-blue">Save Note</button>
		</div>
	);
};
