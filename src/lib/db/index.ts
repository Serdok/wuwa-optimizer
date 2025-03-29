import Dexie, { type EntityTable } from 'dexie';
import type { Echo } from '$lib/data/echoes/types';

const db = new Dexie('optimizer') as Dexie & {
	echoes: EntityTable<Echo, 'id'>;
};

// new - remove `image` key
db.version(1.1).stores({
	echoes: '&id, key, sonata, created_at',
}).upgrade(tx => {
	return tx.table('echoes').toCollection().modify(echo => {
		delete echo.image;
	})
})

db.version(1).stores({
	echoes: '&id, key, sonata, created_at',
})

export { db };