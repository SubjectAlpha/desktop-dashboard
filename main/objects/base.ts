import { v4 as uuidv4 } from "uuid";

export default class Base {
	public id: string;
	public dateAdded: Date;
	/**
	 *
	 */
	constructor(id = uuidv4(), dateAdded = new Date()) {
		this.id = id;
		this.dateAdded = dateAdded;
	}
}
