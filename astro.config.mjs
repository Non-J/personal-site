// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ {
  // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // pages: './src/pages', // Path to Astro components, pages, and data
  // dist: './dist',       // When running `astro build`, path to final static output
  // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
  buildOptions: {
    site: 'http://jirawut.com/',
    sitemap: true,
    pageUrlFormat: 'file',
  },
  devOptions: {
    port: 3000,
    tailwindConfig: './tailwind.config.js',
  },
  renderers: ['@astrojs/renderer-solid'],
};