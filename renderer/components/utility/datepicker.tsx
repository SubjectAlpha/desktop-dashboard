import React, { ChangeEventHandler } from "react";

type DatepickerType = {
	onChange: ChangeEventHandler<HTMLInputElement>;
	className?: string;
};

export default function DatePicker(props: DatepickerType) {
	let className =
		"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
		(props.className ? " " + props.className : "");

	return (
		<input
			onChange={props.onChange}
			className={className}
			type={"datetime-local"}
		/>
	);
}
