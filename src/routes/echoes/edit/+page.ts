import { db } from '$lib/db';

export const load = async ({ url }) => {
	const query = url.searchParams;

	if (!query.has('id')) {
		return { echo: null, };
	}

	const id = query.get('id')!;
	return { echo: await db.echoes.get(id), };
}