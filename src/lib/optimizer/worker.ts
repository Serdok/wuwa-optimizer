import { generate_combinations } from '$lib/math';
import type { Echo } from '$lib/data/echoes/types';
import type { CostCombo } from './optimize';
import type { OptimizerRequest, OptimizerOptions } from '$lib/data/optimizer';

type Data = {
	echoes: { cost_4: Echo[], cost_3: Echo[], cost_1: Echo[] },
	cost_combo: CostCombo,
	input: OptimizerRequest,
	options: OptimizerOptions,
}

self.onmessage = async function (event: MessageEvent) {
	const { echoes, cost_combo, input, options } = event.data as Data;
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

				let set_ok = false;
				for (const sonata in sonatas) {
					if (input.echo.filter.activated_effects[sonata].some(n => (sonatas[sonata]?.length || 0) >= n)) {
						set_ok = true;
					}
				}

				if (input.echo.allow_rainbow || set_ok) {
					// todo: filter unique echo within same sonata
					for (const partial of Object.values(sonatas)) {
						if (partial.every((echo, i, arr) => arr.findIndex(e => e.key === echo.key) === i)) {
							batch.push(build);
						}
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