import type { SonataKey } from '$lib/data/sonatas';
import type { StatValue } from '$lib/data/stats';

export type EchoData = {
	key: string,
	cost: number,
	possible_sonatas: SonataKey[],
	image: { head: string },
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
	image: { head: string },
	created_at: number,
};