import { resolve } from 'node:path';

import { defineConfig } from 'astro/config';
import { shield } from '@kindspells/astro-shield';
import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';

const rootDir = new URL('.', import.meta.url).pathname;
const modulePath = resolve(rootDir, '.astro', 'generated_hashes.mjs');

// https://astro.build/config
export default defineConfig({
	site: 'https://jirawut.com',
	build: {
		format: 'file',
	},
	integrations: [
		solid(),
		tailwind(),
		shield({
			sri: {
				hashesModule: modulePath,
			},
		}),
	],
});
