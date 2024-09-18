import { type Echo } from '$lib/types/echo';
import { fromStore, get } from 'svelte/store';
import { local_storage_store } from '$lib/local_storage_store';
import type { UUID } from '$lib/types/common';

const echoes = local_storage_store('echoes', [] as Echo[]);

export const get_echoes_as_store = () => echoes;
export const get_echoes_as_state = () => fromStore(echoes);
export const get_echoes_snapshot = () => get(echoes);

export const push_echo = (echo: Echo) => {
	echoes.update(e => {
		return [...e, echo];
	});
};

export const unshift_echo = (echo: Echo) => {
	echoes.update(e => {
		return [echo, ...e];
	});
};

export const delete_echo = (id: UUID) => {
	echoes.update(e => {
		return e.filter(e => e.id !== id);
	})
}