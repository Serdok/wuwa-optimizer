import type { Schema } from '$lib/utils';
import type { StatResult, StatSchema, StatType } from '$lib/data/stats/types';
import type { MotionType, SkillType } from '$lib/data/characters/types';
import type { SonataType } from '$lib/data/sonatas/types';
import type { Echo } from '$lib/data/echoes/types';

export type ToggleBuffDef = { kind: 'toggle' };
export type SliderBuffDef = { kind: 'slider', min_value: number, max_value: number };
export type BuffDef = { key: string } & (ToggleBuffDef | SliderBuffDef);
export type RankedBuffDef = { rank: number } & BuffDef;

export type BuffSchema<T extends BuffDef> = Schema<T, 'key'>;
export type AsBuffValues<S extends BuffSchema<BuffDef>> = { [K in keyof S]: S[K]['kind'] extends 'toggle' ? boolean : number; };

export type ApplyContext<D extends BuffDef, S extends BuffSchema<D> = BuffSchema<D>> = { buffs: AsBuffValues<S>; rank: number; build: Echo[]; };
export type ApplyEffect<D extends BuffDef, S extends BuffSchema<D> = BuffSchema<D>> = (stats: StatSchema<StatType>, context: ApplyContext<D, S>) => void;


export type StatTarget = { kind: 'stat'; stat: StatType; };
export type SkillTarget = { kind: 'skill'; skill: string; motion: string; };
export type Target = StatTarget | SkillTarget;


type SonataRequest = {
	sonata: SonataType;
	activated_pieces: number[];
	buffs: AsBuffValues<BuffSchema<BuffDef>>;
};

export type OptimizerRequest = {
	character: { key: string; rank: number; buffs: AsBuffValues<BuffSchema<RankedBuffDef>>; stats: StatResult<StatType>; };
	weapon: { key: string; rank: number; buffs: AsBuffValues<BuffSchema<BuffDef>>; };
	sonatas: Schema<SonataRequest, 'sonata'>;
	echos: { rainbow_build_allowed: boolean; partial_build_allowed: boolean; };
	target: Target;
	keep_count: number;
};


export type MotionDamage = {
	key: string;
	type: MotionType;
	damage: { non_crit: number[]; average: number[]; forced_crit: number[]; };
};

export type SkillDamage = {
	key: string;
	type: SkillType;
	motions: MotionDamage[];
};

