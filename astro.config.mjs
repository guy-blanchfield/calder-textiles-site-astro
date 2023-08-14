import { defineConfig } from "astro/config";

import frontendistahtmlMinify from "@frontendista/astro-html-minify";

// https://astro.build/config
export default defineConfig({
	integrations: [
		frontendistahtmlMinify({
			// https://github.com/frontendista/astro-html-minify#13-customize-minifiers-options
			html: {
				// customise terser options
				// strip out the comments
				removeComments: true,
			},
			// tried using this integration to drop console, wasn't having it
		}),
	],
	vite: {
		esbuild: {
			drop: ["console", "debugger"],
		},
		// halleluja, we got there in the end!
		// NB: won't do the js in public/scripts
		// or any script tag with is:inline
	},
});
