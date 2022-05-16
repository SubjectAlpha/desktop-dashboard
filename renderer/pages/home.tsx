import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Clock } from "../components/clock";
import { Reminders } from "../components/reminders";
import { Affirmations } from "../components/affirmations";
import { Notes } from "../components/notes";

function Home() {
	return (
		<React.Fragment>
			<Head>
				<title>Desktop Dashboard</title>
			</Head>
			<div className="mx-auto mt-10">
				<div className="flex flex-row w-full text-center">
					<div className="basis-1/4 mr-8 ml-8">
						<Clock />
					</div>
					<div className="basis-1/2">
						<Affirmations />
						<Reminders />
					</div>
					<div className="basis-1/4 mr-8 ml-8">
						<Notes />

						<Link href="/settings" className="bottom-0">
							<a className="btn-blue">Settings</a>
						</Link>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Home;
