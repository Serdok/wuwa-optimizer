import { type Writable, writable } from 'svelte/store';
import { browser } from '$app/environment';

export const local_storage_store = <T>(key: string, initial: T): Writable<T> => {
	let current = initial;

	const { set: set_store, ...readable_store } = writable<T>(initial, () => {
		if (!browser) {
			return () => {};
		}

		const get_and_set_from_local_storage = () => {
			const local = localStorage.getItem(key);
			if (!local) {
				// Value not found, initialize
				set(initial);
				return;
			}

			try {
				const data = JSON.parse(local);
				set_store(data as T);
				current = data as T;
			} catch (error) {
				console.error('failed to read value from local storage: ', { error, key, local });
			}
		}

		const update_from_event = (event: StorageEvent) => {
			if (event.key === key) {
				get_and_set_from_local_storage();
			}
		}

		get_and_set_from_local_storage();
		window.addEventListener('storage', update_from_event)

		return () => window.removeEventListener('storage', update_from_event)
	})

	const set_item = (value: T) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.error('failed to write value to local storage: ', { error, key, value });
		}
	}

	const set = (value: T) => {
		current = value;
		if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
			value = JSON.parse(value);
		}
		set_store(value);
		set_item(value);
	}

	const update = (callback: (val: T) => T) => {
		set(callback(current))
	}

	return { ...readable_store, set, update};
}