import Link from "next/link";

type ButtonProps = {
	onClick?: () => void;
	href?: string;
	text: string;
};

export default function Button(props: ButtonProps) {
	if (props.href) {
		return (
			<button
				onClick={props.onClick}
				className="h-10 px-5 m-2 rounded-lg focus:shadow-outline"
			>
				<Link href={props.href}>{props.text}</Link>
			</button>
		);
	}
	return (
		<button
			onClick={props.onClick}
			className="h-10 px-5 m-2 rounded-lg focus:shadow-outline"
		>
			{props.text}
		</button>
	);
}
export function RedButton(props: ButtonProps) {
	if (props.href) {
		return (
			<button
				onClick={props.onClick}
				className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
			>
				<Link href={props.href}>{props.text}</Link>
			</button>
		);
	}

	return (
		<button
			onClick={props.onClick}
			className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
		>
			{props.text}
		</button>
	);
}
export function GreenButton(props: ButtonProps) {
	if (props.href) {
		return (
			<button
				onClick={props.onClick}
				className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
			>
				<Link href={props.href}>{props.text}</Link>
			</button>
		);
	}
	return (
		<button
			onClick={props.onClick}
			className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
		>
			{props.text}
		</button>
	);
}
export function BlueButton(props: ButtonProps) {
	if (props.href) {
		return (
			<button
				onClick={props.onClick}
				className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
			>
				<Link href={props.href}>{props.text}</Link>
			</button>
		);
	}
	return (
		<button
			onClick={props.onClick}
			className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
		>
			{props.text}
		</button>
	);
}
