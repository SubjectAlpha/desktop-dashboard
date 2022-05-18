import React from "react";
import { ipcRenderer } from "electron";
import { BlueButton } from "./button";
import Note from "../objects/notes";

export const Notes = () => {
	const [notes, setNotes] = React.useState(Array<Note>);
	const [text, setText] = React.useState("");

	React.useEffect(() => {
        ipcRenderer.send("notes-read");
		console.log("loading notes...")

        ipcRenderer.on("notes-read-reply", (event, arg) => {
            setNotes([...arg]);
        });
	}, []);

	const saveNotes = () => {
		const newNote = new Note(text);
		let newNotes = [...notes, newNote];
		setNotes(newNotes);

		ipcRenderer.send("notes-save", newNotes);
	};

	return (
		<div className="border-2 h-3/4 p-2">
			<h1>Notes</h1>
			{
                notes.map(note => {
                    return <span key={note.id}>{note.contents}</span>;
                })
            }
			<br />
			<textarea
				style={{ color: "black" }}
				className="w-full"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<BlueButton text="Save Note" onClick={saveNotes} />
		</div>
	);
};
