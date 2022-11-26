/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
	theme: {
		colors: {
			'transparent': 'transparent',
			'current': 'currentColor',
			'black': colors.black,
			'white': colors.white,

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
			fontFamily: {
				Roboto: ['Roboto'],
				Poppins: ['Poppins'],
				OpenSans: ["'Open Sans'"],
				Lato: ['Lato'],
				Raleway: ['Raleway'],
				System: [
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Oxygen-Sans',
					'Ubuntu',
					'Cantarell',
					'Helvetica Neue',
					'sans-serif',
				],
			},
			keyframes: {
				fall: {
					'from': { transform: 'translateY(-500px)' },
					'to': { transform: 'translateY(0px)' },
				},
			},
		},
		screens: {
			sm: { max: '640px' },
			md: { max: '768px' },
			lg: { max: '1024px' },
			xl: { max: '1280px' },
		},
	},
	plugins: [],
};
