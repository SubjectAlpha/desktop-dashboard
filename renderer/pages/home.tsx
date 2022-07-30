import React from "react";
import { BlueButton } from "../components/utility/button";

export default function Home() {
	return (
		<React.Fragment>
			<BlueButton href={"dashboard"} text="Start" />
		</React.Fragment>
	);
}
