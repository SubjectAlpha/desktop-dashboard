import React from "react";
import { ipcRenderer } from "electron";
import Head from "next/head";
import { Affirmations } from "../components/affirmations";
import { Notes } from "../components/notes";
import ControlPanel from "../components/controlpanel";
import Reminder from "../objects/reminders";
import TextArea from "../components/utility/textarea";
import DatePicker from "../components/utility/datepicker";
import { BlueButton, RedButton } from "../components/utility/button";
import { FaSave, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

function Dashboard() {
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
	const [reminders, setReminders] = React.useState(new Array<Reminder>());
    const [date, setDate] = React.useState(new Date());

	const [audio] = React.useState(
		typeof Audio !== "undefined"
			? new Audio("/sound/mixkit-data-scaner-2847.wav")
			: null
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
		const loadReminders = async (event, reminders: Array<Reminder>) => {
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
        reminders.forEach((reminder) => {
            console.log("snoozed", reminder.snoozed);
			let alarmTime = new Date(reminder.dateTime);

			if (date >= alarmTime && !reminder.snoozed ) {
                if(!activeReminders.includes(reminder))
                {
                    setActiveReminders([...activeReminders, reminder]);
                    new Notification(reminder.title, { body: reminder.contents });
                    if(!playing){
                        setPlaying(true);
                    }
                    toast(reminder.contents, {
                        onClose: () => {
                            var filteredActive = activeReminders.filter(active => active != reminder);
                            reminder.snoozed = true;
                            setPlaying(false);
                            setActiveReminders([...filteredActive]);
                        }
                    });
                }
			}
		});
    }, [date && reminders])

    const saveReminders = () => {
		let newReminders = [
			...reminders,
			new Reminder("", reminderText, reminderDate, repeat, repeatDays),
		];
		ipcRenderer.send("reminders-save", newReminders);
		setReminders(newReminders);
	};

	const deleteReminder = (reminderId: string) => {
		const newReminders = reminders.filter((r) => r.id !== reminderId);
		ipcRenderer.send("notes-save", newReminders);
		setReminders(newReminders);
	};

	return (
		<React.Fragment>
			<Head>
				<title>Desktop Dashboard</title>
			</Head>
			<div>
				<div className="flex flex-row w-full text-center">
					<div className="basis-1/4 mr-4">
						<div className="content-start" style={{maxHeight:"10vh", minHeight:"10vh"}}>
							<ControlPanel />
						</div>
                        <Notes />
						<div className="pt-5 text-2xl" style={{minHeight:"10vh"}}>
                            <p>{`${weekdays[date.getDay()]}, ${date.toLocaleString()}`}</p>
                        </div>
					</div>
					<div className="basis-3/4">
						<Affirmations />
						<div className="p-2">
                            <div className="mt-2 mb-2 flex flex-row">
                                <div className="basis-1/4">
                                    <TextArea
                                        value={reminderText}
                                        onChange={(e) => setReminderText(e.target.value)}
                                        placeholder="Add a reminder..."
                                    />
                                </div>
                                <div className="flex flex-row ml-2">
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
                                        className="p-3 m-2 secondary-item basis-full flex flex-row"
                                        key={reminder.id}
                                    >
                                        <div className="basis-1/2">{reminder.contents}</div>
                                        <div className="basis-1/4">
                                            <p>{reminder.dateTime}</p>
                                            <p>
                                                {reminder.repeat &&
                                                reminder.repeatDays.length > 0
                                                    ? reminder.repeatDays.map(
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
                                                    deleteReminder(reminder.id);
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
            <ToastContainer autoClose={false}/>
		</React.Fragment>
	);
}

export default Dashboard;
