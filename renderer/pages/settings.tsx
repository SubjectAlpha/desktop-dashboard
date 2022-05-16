import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Settings() {
	return (
		<React.Fragment>
			<Head>
				<title>Desktop Dashboard - Settings</title>
			</Head>
			<div className="flex flex-row w-full mt-8">
				<div className="basis-1/4 mr-4 ml-4 text-center">
					<Link href="/home" className="w-full">
						<a className="btn btn-blue">Home</a>
					</Link>
				</div>
				<div className="basis-3/4 mr-8">
					<div className="flex flex-col text-2xl w-full text-center">
						<div>
							<h1>Application Settings</h1>
							<hr />
							<p>Start with Windows?</p>
						</div>
						<div>
							<h1>Email Accounts</h1>
							<hr />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
