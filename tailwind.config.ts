import type { Config } from 'tailwindcss';
import { fontFamily as defaultFontFamily } from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			md: '640px',
			lg: '1024px',
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
			fontWeight: {
				light: '200',
				normal: '500',
				bold: '700',
			},
		},
	},
} satisfies Config;
