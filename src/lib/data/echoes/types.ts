import type { SonataKey } from '$lib/data/sonatas';
import type { StatValue } from '$lib/data/stats';

export type EchoData = {
	key: string,
	cost: number,
	possible_sonatas: SonataKey[],
}

export type Echo = {
	id: string,
	key: string,
	sonata: SonataKey,
	cost: number,
	rank: number,
	level: number,
	primary_stat: StatValue,
	secondary_stat: StatValue,
	sub_stats: StatValue[],
	created_at: number,
};