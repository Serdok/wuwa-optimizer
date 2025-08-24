import type { SonataDef, SonataType } from '$lib/data/sonatas/types';
import { SONATAS } from '$lib/data/sonatas/index';
import type { ApplyRequest, BuffDef, BuffSchema } from '$lib/data/optimizer/types';
import { deep_clone } from '$lib/utils';

// erases any type information, so get directly from SONATAS should you need the full definition
export function get_sonata(key: SonataType) {
	return deep_clone(SONATAS[key]) as SonataDef<readonly number[], BuffSchema<BuffDef>>;
}

export function apply_piece_effects(sonata: SonataDef<readonly number[], BuffSchema<BuffDef>>, count: number, request: ApplyRequest<BuffDef, BuffSchema<BuffDef>>) {
	const pieces = sonata.piece_effects;
	for (const set of pieces) {
		if (count <= set) {
			sonata.apply_effect_for[set](...request);
		}
	}
}