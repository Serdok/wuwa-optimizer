import type { ApplyEffect, BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import type { WeaponDef, WeaponInit } from '$lib/data/weapons/types';

export class WeaponBuilder<S extends BuffSchema<BuffDef>> {
	private constructor(private readonly data: WeaponDef<S>) {}

	static create<S extends BuffSchema<BuffDef>>(data: WeaponInit, buffs: S) {
		return new WeaponBuilder<S>({ ...data, buffs, apply_effect: () => {} });
	}

	set_effect(fn: ApplyEffect<BuffDef, S>) {
		return new WeaponBuilder<S>({ ...this.data, apply_effect: fn });
	}

	build() {
		return this.data;
	}
}