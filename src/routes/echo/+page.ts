// we are hitting indexed-db, which is browser-only
export const ssr = false;

import { db } from '$lib/db';

export const load = async () => {
	return { echoes: await db.echoes.toArray() };
}