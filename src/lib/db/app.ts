import Dexie, { type EntityTable } from 'dexie';
import Echo from './echo';

export default class Database extends Dexie {
	echoes!: EntityTable<Echo, 'id'>;

	constructor() {
		super('wuwa-optimizer');

		this.version(1).stores({
			echoes: '&id, name, class, cost, sonata, quality, main_stat.secondary.attribute',
		});
		this.echoes.mapToClass(Echo)
	}
}