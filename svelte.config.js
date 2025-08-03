import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			// default: false,
			entries: [
        '/',
        '/about',
        '/branch',
        '/gallery',
        '/work/yellow-canteen',
        '/work/anti-hate-keyboard',
        '/work/lakra',
        '/work/creaid',
        '/work/arcteryx',
        '/work/tremors',
        '/work/jack-the-clipper',
        '/work/creta-black'
      ]
		}
	},
	plugins: [
		{ ...threeMinifier(), enforce: "pre" }, // <=== Add plugin here
	],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	}
};

export default config;
