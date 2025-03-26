import type { StatKey, StatValue } from '$lib/data/stats';
import type { CharacterData } from '$lib/data/characters';
import type { WeaponData } from '$lib/data/weapons';
import type { SonataKey } from '$lib/data/sonatas';
import type { WorkerPool } from './worker_pool';

export type EchoFilter = {
	allowed_primary_stats: Record<number, StatKey[]>,
	allowed_2p: SonataKey[],
	allowed_5p: SonataKey[],
	allow_rainbow: boolean,
	allow_partial: boolean,
};

export type OptimizerContext = {
	character: {
		key: string,
		sequence: number,
		buffs: Record<string, number>,
		extra_stats: Record<StatKey, StatValue>,
	},
	weapon: {
		key: string,
		rank: number,
		buffs: Record<string, number>,
	},
	filter: EchoFilter,
}

export type OptimizerOptions = {
	pool: WorkerPool,
	sort_key: string,
};

export interface GameplayEffect {
	apply_effects: (input: OptimizerContext, combat_stats: Record<StatKey, number>) => void;
}

export type SwitchBuff = {
	kind: 'switch',
	key: string,
	value: number,
};

export type SliderBuff = {
	kind: 'slider',
	key: string,
	value: number,
	min_value: number,
	max_value: number,
};

export type Buff = SwitchBuff | SliderBuff;



