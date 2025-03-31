import type { StatKey, StatValue } from '$lib/data/stats';
import type { AttackKey, CharacterData, SkillKey } from '$lib/data/characters';
import type { SonataKey } from '$lib/data/sonatas';
import type { Echo } from '$lib/data/echoes/types';
import type { DamageResult } from '$lib/optimizer/build';

export type EchoFilter = {
	allowed_primary_stats: Record<number, StatKey[]>,
	allowed_2p: SonataKey[],
	allowed_5p: SonataKey[],
	allow_rainbow: boolean,
	allow_partial: boolean,
};

export type OptimizerInput = {
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
	target_key: StatKey | `${string}-${string}`,
};

export type OptimizerContext = {
	character: CharacterData,
};

export type WorkerResult = {
	build: Echo[];
	skills: {
		[S in SkillKey]: {
			type: S;
			key: string;
			motions: {
				type: AttackKey;
				key: string;
				non_crit: number[],
				average: number[],
				forced_crit: number[],
			}[];
		};
	};
	build_stats: Record<StatKey, number>;
	display_stats: Record<StatKey, number>;
	final_stats: Record<StatKey, number>;
	target_value: number;
};

type ProgressData = {
	current: DamageResult[],
	total: number,
	processed: number,
	progress: number[],
	remaining_workers: number,
};

type BatchData = { batch: DamageResult[] };

type CompleteData = { total: number, processed: number, completed: boolean, cancelled: boolean };

export type OptimizerOptions = {
	batch_size?: number,
	report_size?: number,
	process_update_interval?: number,
	workers_count?: number,
	on_progress?: (data: ProgressData) => void,
	on_batch?: (data: BatchData) => void,
	on_complete?: (data: CompleteData) => void,
};

export interface GameplayEffect {
	apply_effects: (input: OptimizerInput, combat_stats: Record<StatKey, number>, context: OptimizerContext) => void;
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



