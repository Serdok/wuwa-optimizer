import { paraglideMiddleware } from '$lib/paraglide/server';

export const handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localized_request, locale }) => {
		event.request = localized_request;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});
