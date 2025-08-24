import type { ApplyEffect, BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { SonataDef, SonataInit } from '$lib/data/sonatas/types';

export class SonataBuilder<P extends readonly number[], S extends BuffSchema<BuffDef>> {
	private constructor(private readonly data: SonataDef<P, S>) {}

	static create<P extends readonly number[], S extends BuffSchema<BuffDef>>(data: SonataInit, piece_effects: P, buffs: S) {
		return new SonataBuilder<P, S>({ ...data, piece_effects, buffs, apply_effect_for: Object.fromEntries(piece_effects.map(e => [e, () => {}])) });
	}

	set_effect_for(count: P[number], fn: ApplyEffect<BuffDef, S>) {
		return new SonataBuilder<P, S>({ ...this.data, apply_effect_for: { ...this.data.apply_effect_for, [count]: fn } });
	}

	build() {
		return this.data;
	}
}
