import { resolve } from 'node:path';

import { defineConfig } from 'astro/config';
import * as compress from '@playform/compress';
import mdx from '@astrojs/mdx';
import { shield } from '@kindspells/astro-shield';
import solid from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';

const rootDir = new URL('.', import.meta.url).pathname;
const modulePath = resolve(rootDir, '.astro', 'generated_hashes.mjs');

// https://astro.build/config
export default defineConfig({
	site: 'https://jirawut.com',

	build: {
		format: 'file',
	},

	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'th', 'ko', 'ww'],
		fallback: {
			th: 'en',
			ko: 'en',
			ww: 'en',
		},
	},

	integrations: [
		solid(),
		mdx(),
		compress.default({
			Image: false,
			HTML: {
				'html-minifier-terser': {
					decodeEntities: true,
					minifyCSS: true,
					minifyJS: true,
					removeComments: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					sortAttributes: true,
					sortClassName: true,
				},
			},
		}),
		shield({
			sri: {
				hashesModule: modulePath,
			},
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
