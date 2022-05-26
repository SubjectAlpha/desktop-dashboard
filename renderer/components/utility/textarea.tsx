import { ChangeEventHandler } from "react";

type TextAreaProps = {
	onChange: ChangeEventHandler<HTMLTextAreaElement>;
	className?: string;
	placeholder?: string;
	value?: string;
};

export default function TextArea(props: TextAreaProps) {
	let className =
		"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" +
		(props.className ? " " + props.className : "");

	return (
		<textarea
			onChange={props.onChange}
			className={className}
			placeholder={props.placeholder}
			value={props.value}
		/>
	);
}
