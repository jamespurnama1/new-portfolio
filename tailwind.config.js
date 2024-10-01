/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
	darkMode: ['selector', '[data-theme="dark"]'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Hanken Grotesk Variable"', ...defaultTheme.fontFamily.sans],
				mono: ['"Source Code Pro Variable"', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				gold: '#F5CA0A',
				silver: '#848484',
				bronze: '#724403',
				crystal: '#EFEBE5'
			}
		}
	},
	plugins: [],
	safelist: ['bg-gold', 'bg-silver', 'bg-bronze', 'bg-crystal']
};

