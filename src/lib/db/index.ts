import Dexie, { type EntityTable } from 'dexie';
import type { Echo } from '$lib/data/echoes/types';

const db = new Dexie('optimizer') as Dexie & {
	echoes: EntityTable<Echo, 'id'>;
};

db.version(1).stores({
	echoes: '&id, key, sonata, created_at',
})

export { db };