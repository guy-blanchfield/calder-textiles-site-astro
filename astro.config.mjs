import { defineConfig } from "astro/config";

import frontendistahtmlMinify from "@frontendista/astro-html-minify";

// https://astro.build/config
export default defineConfig({
	site: "https://caldertextiles.guyblanchfield.co.uk/",
	// site: 'https://www.my-site.dev'
	// Astro uses this full URL to generate your sitemap and canonical URLs in your final build.
	// It is strongly recommended that you set this configuration to get the most out of Astro.
	// investigate sitemap
	integrations: [
		frontendistahtmlMinify({
			// https://github.com/frontendista/astro-html-minify#13-customize-minifiers-options
			html: {
				// customise terser options
				// strip out the comments
				removeComments: true,
			},
			js: {
				// tried this, thought it was working once, but must have been mistaken
				// drop: ["console", "debugger"],
				// still removed console from dev though
			},

			// Astro docs shows a way of conditionally configuring based on 'dev', 'preview' etc,
			// but doesn't seem to work for our purpose
			// it's only mentioned with regard to changing the server port
			// Example: Use the function syntax to customize based on command
			// server: ({ command }) => ({ port: command === 'dev' ? 3000 : 4000 }),
		}),
	],
	vite: {
		esbuild: {
			drop: ["console", "debugger"],
		},
		// this works!
		// NB: won't do the js in public/scripts
		// or any script tag with is:inline
		// and also drops console in dev :(

		// https://vitejs.dev/config/#conditional-config
		// nah that didn't work, didn't return for either condition
		// esbuild: ({ command }) => {
		// if (command === "build") {
		// return {
		// build specific config
		// drop: ["console", "debugger"],
		// };
		// }
		// },
	},
});
