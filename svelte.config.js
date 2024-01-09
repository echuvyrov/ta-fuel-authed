import adapter from '@sveltejs/adapter-auto';
// import node from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
		// adapter: node()
	},

	vitePlugin: {
		experimental: {
			inspector: {
				// change shortcut
				toggleKeyCombo: 'meta-shift',
				// hold and release key to toggle inspector mode 
				holdMode: true,
				// show or hide the inspector option
				showToggleButton: 'always',
				// inspector position
				toggleButtonPos: 'top-right',
		  	},
		},
	}
}

export default config;
