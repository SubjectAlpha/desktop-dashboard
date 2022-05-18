import Base from "./base";

export default class Note extends Base {
	private _contents: string;
	/**
	 *
	 */
	constructor(contents: string, id?: string, dateAdded?: Date) {
		super(id, dateAdded);
		this._contents = contents;
	}

	set contents(value: string) {
		this._contents = value;
	}

	get contents(): string {
		return this._contents;
	}
}
