export const ssr = false;

import {
	all_echoes,
	calamity,
	overlord,
	elite,
	common,
	primary_main_stats,
	secondary_main_stats, sub_stats
} from '$lib/data/echoes';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
import { db } from '$lib/db';

export const load = async ({ params }) => {
	const data = await db.echoes.get({ id: params.id });
	const form = data ? await superValidate({ echo: data }, zod(schema), { errors: true }) : await superValidate(zod(schema), { errors: true });

	return {
		id: params.id,
		form,
		schema,
		echoes: {
			all: all_echoes,
			calamity: calamity.map(e => ({ label: e.name, value: e.name })),
			overlord: overlord.map(e => ({ label: e.name, value: e.name })),
			elite: elite.map(e => ({ label: e.name, value: e.name })),
			common: common.map(e => ({ label: e.name, value: e.name })),
		},
		stats: {
			primary: primary_main_stats,
			secondary: secondary_main_stats,
			subs: sub_stats,
		}
	};
}