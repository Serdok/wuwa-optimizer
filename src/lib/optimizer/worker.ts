import { generate_combinations } from '$lib/math';
import type { Echo } from '$lib/data/echoes/types';
import type { CostCombo } from './optimize';
import type { OptimizerRequest, OptimizerOptions } from '$lib/data/optimizer/types';
import type { SonataType } from '$lib/data/sonatas/types';
import type { CharacterKey, Characters } from '$lib/data/characters/types';
import type { WeaponKeysFor, WeaponType } from '$lib/data/weapons/types';

type Data<CK extends CharacterKey, WT extends WeaponType & Characters[CK]['weapon_type'], WK extends WeaponKeysFor<WT>> = {
	echoes: { cost_4: Echo[], cost_3: Echo[], cost_1: Echo[] },
	cost_combo: CostCombo,
	request: OptimizerRequest<CK, WT, WK>,
	options: OptimizerOptions,
}

function echo_keys_are_unique(echoes: Echo[]) {
	const seen = new Set<string>();
	for (const echo of echoes) {
		if (seen.has(echo.key)) return false;
		seen.add(echo.key);
	}

	return true;
}

self.onmessage = async function <CK extends CharacterKey, WT extends WeaponType & Characters[CK]['weapon_type'], WK extends WeaponKeysFor<WT>>(event: MessageEvent) {
	const { echoes, cost_combo, request, options } = event.data as Data<CK, WT, WK>;
	const { count_4, count_3, count_1, pattern } = cost_combo;

	const batch_size = options.batch_size || 1000;
	const report_size = options.report_size || 10000;

	let processed = 0;
	let batch: Echo[][] = [];

	function send_batch(force: boolean = false) {
		if (batch.length >= batch_size || (force && batch.length > 0)) {
			self.postMessage({ type: 'batch', combinations: batch, processed, });
			batch = [];
		}
	}

	const cost_4 = [...generate_combinations(echoes.cost_4, count_4)];
	const cost_3 = [...generate_combinations(echoes.cost_3, count_3)];
	const cost_1 = [...generate_combinations(echoes.cost_1, count_1)];

	console.log(`[${pattern.join('')}] - ${cost_4.length} 4-cost, ${cost_3.length} 3-cost, ${cost_1.length} 1-cost combinations`);

	for (const sel_4 of cost_4) {
		for (const sel_3 of cost_3) {
			for (const sel_1 of cost_1) {
				const build = [...sel_4, ...sel_3, ...sel_1];

				const sonatas = Object.groupBy(build, e => e.sonata);

				let activated_set = false;
				for (const [key, echoes] of Object.entries(sonatas)) {
					const sonata = key as SonataType;
					if (request.sonatas[sonata].activated_pieces.some(n => echoes.length >= n)) {
						activated_set = true;
					}
				}

				if (request.echos.rainbow_build_allowed) {
					batch.push(build);
				} else if (activated_set) {
					if (Object.values(sonatas).every(echoes => echo_keys_are_unique(echoes))) {
						batch.push(build);
					}
				}

				processed += 1;
				send_batch();

				if (processed % report_size === 0) {
					// yield control to allow message processing
					await new Promise(resolve => setTimeout(resolve, 0));
				}
			}
		}
	}

	// send any remaining combinations
	send_batch(true);
	self.postMessage({ type: 'complete', processed });
}