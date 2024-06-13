import { resolve } from 'node:path';

import { defineConfig } from 'astro/config';
import { shield } from '@kindspells/astro-shield';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import * as compress from '@playform/compress';

const rootDir = new URL('.', import.meta.url).pathname;
const modulePath = resolve(rootDir, '.astro', 'generated_hashes.mjs');

// https://astro.build/config
export default defineConfig({
	site: 'https://jirawut.com',
	build: {
		format: 'file',
	},
	compressHTML: true,
	integrations: [
		solid(),
		tailwind(),
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
});
