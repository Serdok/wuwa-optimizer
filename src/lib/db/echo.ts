import type Database from '$lib/db/app';
import { Entity } from 'dexie';
import { Class, type Cost, type Quality, Sonata } from '$lib/types/echo';
import {
	AttackDMGBonus,
	type BaseAttribute,
	CombatAttribute,
	ElementDMGBonus,
	type Stat
} from '$lib/types/stat';

export default class Echo extends Entity<Database> {
	id!: string;
	name!: string;
	sonata!: Sonata;
	quality!: Quality;
	class!: Class;
	cost!: Cost;
	level!: number;
	main_stat!: {
		primary: Stat<BaseAttribute>,
		secondary: Stat<CombatAttribute> | Stat<ElementDMGBonus>
	};
	sub_stats!: (Stat<BaseAttribute> | Stat<CombatAttribute> | Stat<ElementDMGBonus> | Stat<AttackDMGBonus>)[];
	image!: {
		head: string,
	}
}