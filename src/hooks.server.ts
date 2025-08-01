import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { paraglideMiddleware } from '$lib/paraglide/server';

const paraglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localized_request, locale }) => {
		event.request = localized_request;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const ignore_devtools: Handle = ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools')) {
		return new Response(null, { status: 204, });
	}

	return resolve(event);
};

export const handle = sequence(ignore_devtools, paraglide);