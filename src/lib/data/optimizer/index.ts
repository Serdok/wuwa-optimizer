import type { StatKey, StatValue } from '$lib/data/stats';
import type { AttackKey, CharacterData, SkillKey } from '$lib/data/characters';
import type { SonataBuff, SonataKey } from '$lib/data/sonatas';
import type { Echo } from '$lib/data/echoes/types';
import type { DamageResult } from '$lib/optimizer/build';

export type EchoFilter = {
	allowed_primary_stats: Record<number, StatKey[]>,
	activated_effects: Record<SonataKey, number[]>,
};

export type StatTarget = {
	kind: 'stat',
	stat: StatKey,
};

export type MotionTarget = {
	kind: 'motion',
	skill: string,
	motion: string,
};

export type Target = StatTarget | MotionTarget;

export type OptimizerRequest = {
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
	echo: {
		filter: EchoFilter,
		allow_rainbow: boolean,
		allow_partial: boolean,
		buffs: Record<SonataKey, SonataBuff<SonataKey>>,
	},
	target_key: Target,
	keep_count: number,
};

export type OptimizerContext = {
	character: CharacterData,
	build: Echo[],
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
	max_workers?: number,
	on_progress?: (data: ProgressData) => void,
	on_batch?: (data: BatchData) => void,
	on_complete?: (data: CompleteData) => void,
};

export interface GameplayEffect {
	apply_effects: (request: OptimizerRequest, combat_stats: Record<StatKey, number>, context: OptimizerContext) => void;
}

export type SwitchBuff = {
	kind: 'switch',
	key: string,
};

export type SliderBuff = {
	kind: 'slider',
	key: string,
	min_value: number,
	max_value: number,
};

export type Buff = SwitchBuff | SliderBuff;



