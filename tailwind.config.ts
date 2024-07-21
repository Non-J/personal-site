import type { Config } from 'tailwindcss';
import { fontFamily as defaultFontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'media',
	theme: {
		screens: {
			sm: '475px',
			md: '768px',
			lg: '1024px',
			xl: '1600px',
		},
		extend: {
			fontFamily: {
				sans: [
					'Lexend',
					'Anakotmai',
					'NanumGothic',
					'Twemoji Mozilla',
					...defaultFontFamily.sans,
				],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.text-link': {
					'@apply underline text-indigo-700 dark:text-indigo-200 font-medium':
						{},
				},
				'.text-autoscale': {
					'@apply text-sm sm:text-base lg:text-lg xl:text-xl': {},
				},
				'.w-center-column': {
					'@apply max-w-screen-lg mx-auto px-3 md:px-8': {},
				},
			});
		}),
		plugin(function ({ addBase }) {
			addBase({
				body: {
					'@apply bg-yellow-50 dark:bg-slate-800 dark:text-neutral-200': {},
				},
			});
		}),
	],
} satisfies Config;
