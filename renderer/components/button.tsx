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
export function GrayButton(props: ButtonProps) {
	return (
		<Link
			href={props.href}
			onClick={props.onClick}
			className="h-10 px-5 m-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800"
		>
			{props.text}
		</Link>
	);
}
export function PinkButton(props: ButtonProps) {
	return (
		<Link
			href={props.href}
			onClick={props.onClick}
			className="h-10 px-5 m-2 text-pink-100 transition-colors duration-150 bg-pink-600 rounded-lg focus:shadow-outline hover:bg-pink-700"
		>
			{props.text}
		</Link>
	);
}
export function PurpleButton(props: ButtonProps) {
	return (
		<Link
			href={props.href}
			onClick={props.onClick}
			className="h-10 px-5 m-2 text-purple-100 transition-colors duration-150 bg-purple-600 rounded-lg focus:shadow-outline hover:bg-purple-700"
		>
			{props.text}
		</Link>
	);
}
export function WhiteButton(props: ButtonProps) {
	return (
		<Link
			href={props.href}
			onClick={props.onClick}
			className="h-10 px-5 text-gray-800 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-gray-200"
		>
			{props.text}
		</Link>
	);
}
