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
				<title>Home - Nextron (with-typescript-tailwindcss)</title>
			</Head>
			<div className="container mx-auto">
				<div className="flex flex-row w-full text-center">
					<div className="basis-1/4">
						<Clock />
					</div>
					<div className="basis-1/2">
						<Affirmations />
						<Reminders />
					</div>
					<div className="basis-1/4">
						<Notes />
					</div>
				</div>
			</div>

			<div className="mt-1 w-full flex-wrap flex justify-center">
				<Link href="/next">
					<a className="btn-blue">Go to next page</a>
				</Link>
			</div>
		</React.Fragment>
	);
}

export default Home;
