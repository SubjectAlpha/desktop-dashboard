import Base from "./base";

export default class Affirmation extends Base {
	public contents: string;
	/**
	 *
	 */

	constructor(contents: string, id?: string, dateAdded?: Date) {
		super(id, dateAdded);
		this.contents = contents;
	}
}
