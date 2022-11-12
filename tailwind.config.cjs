/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
	theme: {
		colors: {
			'purple': '#5C004C',
			'red': '#F70002',
			'light-red': '#FF3D78',
			'pink': '#FF739A',
			'light-pink': '#FFBDD8',
			'light-yellow': '#FFEDD4',

			'neu1-1': '#F5F7FA',
			'neu1-2': '#E4E7EB',
			'neu1-3': '#CBD2D9',
			'neu1-4': '#9AA5B1',
			'neu1-5': '#7B8794',
			'neu1-6': '#616E7C',
			'neu1-7': '#52606D',
			'neu1-8': '#3E4C59',
			'neu1-9': '#323F4B',
			'neu1-10': '#1F2933',
		},

		extend: {
			colors,
		},
	},
	plugins: [],
};
