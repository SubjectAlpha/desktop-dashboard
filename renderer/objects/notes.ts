import Base from "./base";

export default class Note extends Base {
	public contents: string;
	/**
	 *
	 */
	constructor(contents: string, id?: string, dateAdded?: Date) {
		super(id, dateAdded);
		this.contents = contents;
	}
}
