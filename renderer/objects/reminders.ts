import Base from "./base";

export default class Reminder extends Base {
	public title: string;
	public contents: string;
	public dateTime: string;
	public repeat: boolean;
	public repeatDays: number[];
	public snoozed: boolean = false;

	/**
	 *
	 */
	constructor(
		title: string,
		contents: string,
		dateTime?: Date,
		repeat?: boolean,
		repeatDays?: number[],
		id?: string,
		dateAdded?: Date
	) {
		super(id, dateAdded);
		this.title = title;
		this.contents = contents;
		this.dateTime = dateTime.toLocaleString();
		this.repeat = repeat;
		this.repeatDays = repeatDays;
	}
}

enum ReminderStatus {
	Pending,
	Completed,
	Overdue,
}
