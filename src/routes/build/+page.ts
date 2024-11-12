import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { schema } from './schema';
import { characters } from '$lib/data/characters';
import { weapons } from '$lib/data/weapons';



export const load = async () => {
	const form = await superValidate(zod(schema), { errors: true });

	return { form, schema, characters, weapons };
}