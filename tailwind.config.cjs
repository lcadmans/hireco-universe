/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		fontFamily: {
			body: ['Montserrat', 'Open Sans', 'Helvetica', 'Arial', 'sans-serif']
		}
	},
	plugins: [require('prettier-plugin-tailwindcss')]
}
