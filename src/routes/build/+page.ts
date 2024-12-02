import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { schema } from './schema';
import { characters } from '$lib/data/characters';
import { weapons } from '$lib/data/weapons';
import { db } from '$lib/db';

export const load = async () => {
	const form = await superValidate(zod(schema), { errors: true });
	const echoes = db.echoes.toArray();

	return { form, schema, characters, weapons, echoes };
}