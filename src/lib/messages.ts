import { m } from '$lib/paraglide/messages';
import { getLocale } from '$lib/paraglide/runtime';

type Messages = typeof m;
type MessageFn = (...args: unknown[]) => unknown;

type KeysWithNoParams = {
	[K in keyof Messages]: Parameters<Messages[K]> extends [] ? K : never;
};

export function get_message<T extends KeysWithNoParams>(key: T): string;
export function get_message<T extends keyof Messages>(key: T, ...args: Parameters<Messages[T]>): string;
export function get_message(key: string, ...args: unknown[]): string;

export function get_message<T extends keyof Messages>(key: T | string, ...args: T extends keyof Messages ? Parameters<Messages[T]> : unknown[]) {
	if (!(key in m)) {
		console.warn(`key '${String(key)}' not found in messages for '${getLocale()}'`);
		return key;
	}

	const fn = (m as Record<string, unknown>)[key as string];
	if (typeof fn !== 'function') {
		console.warn(`key '${String(key)}' is not a function in messages for '${getLocale()}'`);
		return key;
	}

	return (fn as MessageFn)(...args) as string;
}