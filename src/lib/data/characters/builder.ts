import type { ApplyEffect, BuffSchema, RankedBuffDef } from '$lib/data/optimizer/types';
import type {
	CharacterDef,
	CharacterInit,
	MotionDef,
	MotionKeys,
	SkillDef,
	SkillType
} from '$lib/data/characters/types';
import type { Schema } from '$lib/utils';

type WithSkillMotions<
	BS extends BuffSchema<RankedBuffDef>,
	S extends Schema<SkillDef<readonly MotionDef[], BS>, 'type'>,
	T extends SkillType,
	M extends readonly MotionDef[]
> = {
	[P in keyof S]: P extends T ? SkillDef<M, BS> : S[P];
};

export class CharacterBuilder<BS extends BuffSchema<RankedBuffDef>, S extends Schema<SkillDef<readonly MotionDef[], BS>, 'type'>> {
	constructor(private readonly def: CharacterDef<BS>) {}

	static create_from<BS extends BuffSchema<RankedBuffDef>, S extends Schema<SkillDef<readonly MotionDef[], BS>, 'type'>>(data: CharacterDef<BS>) {
		return new CharacterBuilder<BS, S>(data);
	}

	static create<BS extends BuffSchema<RankedBuffDef>, S extends Schema<SkillDef<readonly MotionDef[], BS>, 'type'>>(init: CharacterInit, buffs: BS) {
		return CharacterBuilder.create_from<BS, S>({
			...init,
			buffs,
			skills: {
				normal: { type: 'normal', key: 'normal', motions: [], apply_effect: () => {}, motions_effect: {} },
				skill: { type: 'skill', key: 'skill', motions: [], apply_effect: () => {}, motions_effect: {} },
				forte: { type: 'forte', key: 'forte', motions: [], apply_effect: () => {}, motions_effect: {} },
				burst: { type: 'burst', key: 'burst', motions: [], apply_effect: () => {}, motions_effect: {} },
				intro: { type: 'intro', key: 'intro', motions: [], apply_effect: () => {}, motions_effect: {} },
				outro: { type: 'outro', key: 'outro', motions: [], apply_effect: () => {}, motions_effect: {} }
			},
			apply_effect: () => {},
			create_ranked: (base) => base,
		});
	}

	// set global effects
	set_effect(cb: ApplyEffect<RankedBuffDef, BS>) {
		return new CharacterBuilder<BS, S>({ ...this.def, apply_effect: cb });
	}

	// modify the definition depending on the rank
	set_rank_effect(fn: (base: CharacterDef<BS>, rank: number) => CharacterDef<BS>) {
		return new CharacterBuilder<BS, S>({ ...this.def, create_ranked: fn });
	}

	with_skill<K extends SkillType>(skill: K, updater: (prev: S[K]) => S[K]) {
		const next = {
			...this.def,
			skills: { ...this.def.skills, [skill]: updater(this.def.skills[skill] as S[K]) }
		};
		return new CharacterBuilder<BS, S>(next);
	}

	set_skill_key(skill: SkillType, key: string) {
		return this.with_skill(skill, (prev) => ({ ...prev, key }));
	}

	set_skill_effect(skill: SkillType, cb: ApplyEffect<RankedBuffDef, BS>) {
		return this.with_skill(skill, (prev) => ({ ...prev, apply_effects: cb }));
	}

	// set the motions for a skill
	set_skill_motions<K extends SkillType, M extends readonly MotionDef[]>(skill: K, motions: M) {
		const next = {
			...this.def,
			skills: { ...this.def.skills, [skill]: { ...(this.def.skills[skill] as S[K]), motions, } }
		};

		return new CharacterBuilder<BS, WithSkillMotions<BS, S, K, M>>(next);
	}

	// set effects for a specific motion
	set_motion_effect<K extends SkillType>(skill: K, motion: MotionKeys<S[K]['motions']>, cb: ApplyEffect<RankedBuffDef, BS>) {
		return this.with_skill(skill, (prev) => ({
			...prev,
			motion_effects: { ...(prev.motions_effect ?? {}), [motion]: cb ?? (() => {}) }
		}));
	}

	build() { return this.def; }
}
