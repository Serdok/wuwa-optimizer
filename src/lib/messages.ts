import { m } from '$lib/paraglide/messages';
import { getLocale } from '$lib/paraglide/runtime';

export function get_message(key: string): string {
	if (!m[key]) {
		console.warn(`key '${key}' not found in messages for '${getLocale()}'`);
		return key;
	}

	return m[key]();
}