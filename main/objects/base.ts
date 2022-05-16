import { v4 as uuidv4 } from "uuid";

export default class Base {
	private _id: string;
	private _dateAdded: Date;
	/**
	 *
	 */
	constructor(id = uuidv4(), dateAdded = new Date()) {
		this._id = id;
		this._dateAdded = dateAdded;
	}

	get id(): string {
		return this._id;
	}

	get dateAdded(): Date {
		return this._dateAdded;
	}
}
