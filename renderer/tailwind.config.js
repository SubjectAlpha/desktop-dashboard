const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./renderer/pages/**/*.{js,ts,jsx,tsx}",
		"./renderer/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			// use colors only specified
			white: colors.white,
			gray: colors.gray,
			blue: colors.blue,
			red: colors.red,
			green: colors.green,
			orange: colors.orange,
			pink: colors.pink,
			purple: colors.purple,
		},
		extend: {},
	},
	plugins: [],
};
