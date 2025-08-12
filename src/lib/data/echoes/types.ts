import type { StatDef, StatType } from '$lib/data/stats/types';
import type { SonataType } from '$lib/data/sonatas/types';

export type EchoDef = {
	key: string,
	cost: number,
	possible_sonatas: SonataType[],
}

export type Echo = {
	id: string,
	key: string,
	sonata: SonataType,
	cost: number,
	rank: number,
	level: number,
	primary_stat: StatDef<StatType>,
	secondary_stat: StatDef<StatType>,
	sub_stats: StatDef<StatType>[],
	created_at: number,
};