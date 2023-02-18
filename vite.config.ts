import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { viteRequire } from 'vite-require';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths({}), svgr(), viteRequire()],
});
