import { sveltekit } from "@sveltejs/kit/vite"

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		host: '127.0.0.1'
	},  
  plugins: [sveltekit()],
}

export default config
