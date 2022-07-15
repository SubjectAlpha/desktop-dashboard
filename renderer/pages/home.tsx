import React from "react";
import { ipcRenderer } from "electron";
import Head from "next/head";
import Link from "next/link";
import { Affirmations } from "../components/affirmations";
import { Notes } from "../components/notes";
import ControlPanel from "../components/controlpanel";
import Reminder from "../objects/reminders";
import TextArea from "../components/utility/textarea";
import DatePicker from "../components/utility/datepicker";
import { BlueButton, RedButton } from "../components/utility/button";
import { FaSave, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function Home() {
    const weekdays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const [reminderText, setReminderText] = React.useState("");
	const [reminderDate, setReminderDate] = React.useState(new Date());
	const [repeat, setRepeat] = React.useState(false);
	const [repeatDays, setRepeatDays] = React.useState(new Array<number>);
	const [reminders, setReminders] = React.useState(new Array<any>());
    const [date, setDate] = React.useState(new Date());

	const [audio] = React.useState(
		typeof Audio !== "undefined"
			? new Audio("/sound/mixkit-data-scaner-2847.wav")
			: undefined
	);
	const [playing, setPlaying] = React.useState(false);
    const [activeReminders, setActiveReminders] = React.useState(Array<Reminder>);

	React.useEffect(() => {
		if (ipcRenderer) {
			ipcRenderer.send("reminders-read");
		}
	}, []);

    React.useEffect(() => {
		const interval = setInterval(() => {
			const date = new Date();

			setDate(date);
		}, 1000);

		return () => clearInterval(interval);
	}, [date]);

    React.useEffect(() => {
		playing ? audio.play() : audio.pause();
	}, [date, playing]);

	React.useEffect(() => {
		const loadReminders = async (event, reminders: Reminder[]) => {
			if (reminders) {
				reminders.reverse();
				setReminders([...reminders]);
			}
		};

		if (ipcRenderer) {
			ipcRenderer.on("reminders-read-reply", loadReminders);
			return () => {
				ipcRenderer.removeListener(
					"reminders-read-reply",
					loadReminders
				);
			};
		}
	}, [reminders]);

    React.useEffect(() => {
        reminders.forEach((a) => {
            console.log("snoozed", a._snoozed);
			let alarmTime = new Date(a._dateTime);

			if (date >= alarmTime && !a.Snoozed ) {
                if(!activeReminders.includes(a))
                {
                    setActiveReminders([...activeReminders, a]);
                    setPlaying(false);
                    new Notification("New Reminder", { body: a._contents })
                    toast(a._contents, {
                        onClose: () => {
                            var filteredActive = activeReminders.filter(r => r == a);
                            a._snoozed = true;
                            //let reminderFilter = activeReminders.filter(r => r.id != a.id);
                            //setActiveReminders(reminderFilter);
                            setPlaying(false);
                            setActiveReminders([...filteredActive]);
                        }
                    });
                }
			}
		});
    }, [date && reminders])

    React.useEffect(() =>{
        console.log("active reminders", activeReminders);
    }, [activeReminders])

    const saveReminders = () => {
		let newReminders = [
			...reminders,
			new Reminder("", reminderText, reminderDate, repeat, repeatDays),
		];
		ipcRenderer.send("reminders-save", newReminders);
		setReminders(newReminders);
	};

	const deleteReminder = (reminderId: string) => {
		const newReminders = reminders.filter((r) => r._id !== reminderId);
		ipcRenderer.send("notes-save", newReminders);
		setReminders(newReminders);
	};

	return (
		<React.Fragment>
			<Head>
				<title>Desktop Dashboard</title>
			</Head>
			<div className="mx-auto">
				<div className="flex flex-row w-full text-center">
					<div className="basis-1/4 mr-8 ml-8">
						<div className="content-start">
							<ControlPanel />
						</div>
						<div className="border-2 border-white-500 p-2 text-4xl">
                            <h2>{weekdays[date.getDay()]}</h2>
                            <h2>{date.toLocaleString()}</h2>
                        </div>
					</div>
					<div className="basis-1/2">
						<Affirmations />
						<div className="border-2 p-2">
                            <h2 className="font-medium text-3xl">Reminders</h2>
                            <hr />
                            <div className="mt-2 mb-2 flex flex-row">
                                <div className="basis-1/4">
                                    <TextArea
                                        value={reminderText}
                                        onChange={(e) => setReminderText(e.target.value)}
                                        placeholder="Add a reminder..."
                                    />
                                </div>
                                <div className="flex flex-row basis-3/4 ml-2">
                                    <div className="flex flex-col mr-2">
                                        <h3>Notification Date/Time</h3>
                                        <DatePicker
                                            onChange={(e) => {
                                                setReminderDate(new Date(e.target.value));
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col text-center mr-2">
                                        <label>
                                            Remind Me?
                                            <input
                                                style={{ color: "black" }}
                                                type={"checkbox"}
                                                onChange={(e) => setRepeat(e.target.checked)}
                                            />
                                        </label>
                                        <select multiple style={{ color: "black" }} onChange={(e) => {
                                            let tempRepeatDays = new Array<number>();
                                            for(let i = 0; i < e.target.selectedOptions.length; i++) {
                                                tempRepeatDays.push(parseInt(e.target.selectedOptions[i].value));
                                            }
                                            setRepeatDays([...tempRepeatDays]);
                                        }}>
                                            {weekdays.map((day, index) => {
                                                return <option key={index} value={index}>{day}</option>
                                            })}
                                        </select>
                                    </div>
                                    <BlueButton onClick={saveReminders}>
                                        <FaSave />
                                    </BlueButton>
                                </div>
                            </div>
                            <div className="flex flex-col mt-2">
                                {reminders.map((reminder) => (
                                    <div
                                        className="p-3 m-2 bg-sky-900 basis-full flex flex-row"
                                        key={reminder._id}
                                    >
                                        <div className="basis-1/2">{reminder._contents}</div>
                                        <div className="basis-1/4">
                                            <p>{reminder._dateTime}</p>
                                            <p>
                                                {reminder._repeat &&
                                                reminder._repeatDays.length > 0
                                                    ? reminder._repeatDays.map(
                                                            (day: number) => (
                                                                <span key={day}>
                                                                    {weekdays[day]},{" "}
                                                                </span>
                                                            )
                                                    )
                                                    : "No Repeat"}
                                            </p>
                                        </div>
                                        <div className="basis-1/4">
                                            <RedButton
                                                onClick={() => {
                                                    deleteReminder(reminder._id);
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
					<div className="basis-1/4 mr-8 ml-8">
						<Notes />
					</div>
				</div>
			</div>
            <ToastContainer autoClose={false} />
		</React.Fragment>
	);
}

export default Home;
