import Link from "next/link";

type ButtonProps = {
	onClick?: () => void;
	className?: string;
	href?: string;
	text?: string;
	children?: React.ReactNode | React.ReactNode[];
	style?: React.CSSProperties;
};

export default function Button(props: ButtonProps) {
	let className =
		"h-10 px-5 m-2 rounded-lg focus:shadow-outline" +
		(props.className ? " " + props.className : "");
	if (props.href) {
		return (
			<Link href={props.href}>
				<button onClick={props.onClick} className={className}>
					{props.text || props.children}
				</button>
			</Link>
		);
	}
	return (
		<button onClick={props.onClick} className={className}>
			{props.text || props.children}
		</button>
	);
}
export function RedButton(props: ButtonProps) {
	if (props.href) {
		return (
			<Link href={props.href}>
				<button
					onClick={props.onClick}
					className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
				>
					{props.text || props.children}
				</button>
			</Link>
		);
	}

	return (
		<button
			onClick={props.onClick}
			className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
		>
			{props.text || props.children}
		</button>
	);
}
export function GreenButton(props: ButtonProps) {
	let className =
		"h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800" +
		(props.className ? " " + props.className : "");

	if (props.href) {
		return (
			<Link href={props.href}>
				<button onClick={props.onClick} className={className}>
					{props.text || props.children}
				</button>
			</Link>
		);
	}
	return (
		<button onClick={props.onClick} className={className}>
			{props.text || props.children}
		</button>
	);
}
export function BlueButton(props: ButtonProps) {
	let className =
		"h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700" +
		(props.className ? " " + props.className : "");
	if (props.href) {
		return (
			<Link href={props.href}>
				<button
					onClick={props.onClick}
					className={className}
					style={props.style}
				>
					{props.text || props.children}
				</button>
			</Link>
		);
	}
	return (
		<button
			onClick={props.onClick}
			className={className}
			style={props.style}
		>
			{props.text || props.children}
		</button>
	);
}
