import React from "react";
import { ipcRenderer } from "electron";
import { BlueButton, RedButton } from "./button";
import Note from "../objects/notes";

export const Notes = () => {
	const [notes, setNotes] = React.useState(new Array<any>());
	const [text, setText] = React.useState("");

	React.useEffect(() => {
		if (ipcRenderer) {
			ipcRenderer.send("notes-read");
		}
	}, []);

	React.useEffect(() => {
		const loadNotes = async (event, notes: Note[]) => {
			setNotes([...notes]);
		};

		if (ipcRenderer) {
			ipcRenderer.on("notes-read-reply", loadNotes);
			return () => {
				ipcRenderer.removeListener("notes-read-reply", loadNotes);
			};
		}
	}, [notes]);

	const saveNotes = () => {
		if (text !== "" && text !== " " && text !== undefined) {
			const newNote = new Note(text);
			let newNotes = [...notes, newNote];
			ipcRenderer.send("notes-save", newNotes);
			setNotes(newNotes);
			setText("");
		}
	};

	const deleteNote = (noteId: string) => {
		const newNotes = notes.filter((n) => n._id !== noteId);
		ipcRenderer.send("notes-save", newNotes);
		setNotes(newNotes);
	};

	return (
		<div className="border-2 p-2">
			<h2 className="font-medium text-3xl">Notes</h2>
			<hr />
			<div className="flex flex-row">
				<div className="basis-3/4">
					<textarea
						style={{ color: "black" }}
						className="w-full"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
				<div className="basis-1/4">
					<BlueButton text="Save Note" onClick={saveNotes} />
				</div>
			</div>
			{notes.map((note) => (
				<div
					className="p-2 m-2 bg-gray-500 flex flex-row justify-between items-center"
					key={note._id}
				>
					<div className="basis-1/2">{note._contents}</div>
					<div className="basis-1/4">
						<RedButton
							text="Delete"
							onClick={() => {
								deleteNote(note._id);
							}}
						/>
					</div>
				</div>
			))}
		</div>
	);
};
