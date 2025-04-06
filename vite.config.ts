import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['localStorage', 'preferredLanguage', 'baseLocale'],
		})
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
