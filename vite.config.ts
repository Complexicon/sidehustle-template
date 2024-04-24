import { defineConfig } from 'vite';
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact({ devToolsEnabled: true }), {
		name: 'full-reload',
		handleHotUpdate({ server }) {
			server.ws.send({ type: "full-reload" });
			return [];
		},
	}],
	clearScreen: false,
});