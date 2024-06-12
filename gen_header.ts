import {
	inlineScriptHashes,
	inlineStyleHashes,
} from '.astro/generated_hashes.mjs';

const header_template = `
https://:project.pages.dev/*
  X-Robots-Tag: noindex

/*
  X-Content-Type-Options: nosniff
  X-Permitted-Cross-Domain-Policies: none
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-site
  Referrer-Policy: no-referrer
  Content-Security-Policy: !!!INJECTCSP!!!
`.trimStart();

let csp_script_hashes = inlineScriptHashes.map((x) => `'${x}'`).join(' ');
let csp_style_hashes = inlineStyleHashes.map((x) => `'${x}'`).join(' ');

const csp = `default-src 'self'; script-src 'self' static.cloudflareinsights.com ${csp_script_hashes}; style-src 'self' ${csp_style_hashes}; object-src 'none'; connect-src 'self' cloudflareinsights.com; frame-ancestors 'none'; upgrade-insecure-requests;`;

const headers = header_template.replace('!!!INJECTCSP!!!', csp);

await Bun.write('dist/_headers', headers);
