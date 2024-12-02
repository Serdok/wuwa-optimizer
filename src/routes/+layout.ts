import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

export const prerender = 'auto';

injectAnalytics({ mode: dev ? 'development' : 'production' });