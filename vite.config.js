import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from 'tailwindcss';

export default defineConfig({
	base: "/",
	plugins: [react()],
	css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
		},
	},
	server: {
		historyApiFallback: true,
	},
});
