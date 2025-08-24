import type { Schema } from '$lib/utils';
import type { StatDef, StatResult, StatType } from '$lib/data/stats/types';
import type {
	CharacterDef,
	CharacterKey, Characters,
	MotionType,
	SkillType,
} from '$lib/data/characters/types';
import type { SonataType } from '$lib/data/sonatas/types';
import type { WeaponDef, WeaponKeysFor, WeaponType } from '$lib/data/weapons/types';
import type { Echo } from '$lib/data/echoes/types';

export type ToggleBuffDef = { kind: 'toggle' };
export type SliderBuffDef = { kind: 'slider', min_value: number, max_value: number };
export type BuffDef = { key: PropertyKey } & (ToggleBuffDef | SliderBuffDef);
export type RankedBuffDef = { rank: number } & BuffDef;

export type BuffSchema<T extends BuffDef> = Schema<T, 'key'>;
export type AsBuffValues<D extends BuffDef, S extends BuffSchema<D>> = { [K in keyof S]: S[K]['kind'] extends 'toggle' ? boolean : number; };

export type ApplyContext<D extends BuffDef, S extends BuffSchema<D>> = { buffs: AsBuffValues<D, S>; rank: number; character: CharacterDef<BuffSchema<RankedBuffDef>>; weapon: WeaponDef<BuffSchema<BuffDef>>; };
export type ApplyEffect<D extends BuffDef, S extends BuffSchema<D>> = (stats: StatResult<StatType>, context: ApplyContext<D, S>) => void;
export type ApplyRequest<D extends BuffDef, S extends BuffSchema<D>> = Parameters<ApplyEffect<D, S>>;


export type StatTarget = { kind: 'stat'; stat: StatType; };
export type MotionTarget = { kind: 'motion'; skill: string; motion: string; };
export type Target = StatTarget | MotionTarget;


export type CharacterRequest<CK extends CharacterKey> = {
	key: CK;
	rank: number;
	buffs: AsBuffValues<BuffDef, BuffSchema<RankedBuffDef>>;
	stat_bonus: StatDef<StatType>[];
	extra_stats: StatResult<StatType>;
};

export type WeaponRequest<WT extends WeaponType, WK extends WeaponKeysFor<WT>> = {
	type: WT;
	key: WK;
	rank: number;
	buffs: AsBuffValues<BuffDef, BuffSchema<BuffDef>>;
};

export type SonataRequest = {
	sonata: SonataType;
	activated_pieces: number[];
	buffs: AsBuffValues<BuffDef, BuffSchema<BuffDef>>;
};

export type EchoRequest = {
	allowed_primary_stats: Record<number, StatType[]>,
	rainbow_build_allowed: boolean;
	partial_build_allowed: boolean;
};

export type OptimizerRequest<CK extends CharacterKey, WT extends WeaponType & Characters[CK]['weapon_type'], WK extends WeaponKeysFor<WT>> = {
	character: CharacterRequest<CK>;
	weapon: WeaponRequest<WT, WK>;
	sonatas: Schema<SonataRequest, 'sonata'>;
	echos: EchoRequest;
	target: Target;
	keep_count: number;
};

export type DamageSelection = 'non_crit' | 'average' | 'forced_crit';
export type DamageNumbers = Record<DamageSelection, number[]>;

export type MotionDamage = {
	key: string;
	type: MotionType;
	damage: DamageNumbers;
};

export type SkillDamage = {
	key: string;
	type: SkillType;
	motions: MotionDamage[];
};

export type DamageResult = {
	build: Echo[];
	skills: Record<SkillType, SkillDamage>;
	stats: { build: StatResult<StatType>; display: Partial<StatResult<StatType>>; final: StatResult<StatType>; };
	target: number;
};

export type ProgressEvent = {
	current: DamageResult[];
	total: number;
	processed: number;
	progress: number[];
	remaining_workers: number;
};
export type BatchEvent = { batch: DamageResult[] };
export type CompleteEvent = { total: number; processed: number; completed: boolean; cancelled: boolean; };

export type OptimizerOptions = {
	batch_size?: number;
	report_size?: number;
	process_update_interval?: number;
	max_workers?: number;
	on_progress?: (evt: ProgressEvent) => void;
	on_batch?: (evt: BatchEvent) => void;
	on_complete?: (evt: CompleteEvent) => void;
};