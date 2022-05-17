import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Clock } from "../components/clock";
import { Reminders } from "../components/reminders";
import { Affirmations } from "../components/affirmations";
import { Notes } from "../components/notes";
import ControlPanel from "../components/controlpanel";

function Home() {
	return (
		<React.Fragment>
			<Head>
				<title>Desktop Dashboard</title>
			</Head>
			<div className="mx-auto">
				<div className="flex flex-row w-full text-center h-screen">
					<div className="basis-1/4 mr-8 ml-8">
						<Clock />
					</div>
					<div className="basis-1/2">
						<Affirmations />
						<Reminders />
					</div>
					<div className="basis-1/4 mr-8 ml-8">
						<Notes />

						<div className="content-end">
							<ControlPanel />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Home;
