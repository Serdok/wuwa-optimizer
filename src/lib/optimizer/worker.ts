import { generate_combinations } from '$lib/math';
import type { Echo } from '$lib/data/echoes/types';


self.onmessage = async function (event: MessageEvent) {
	const { echoes, input, options } = event.data;

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

	function* generate_worker_combination(): Generator<Echo[]> {
		for (let i = 0; i < echoes.length; i += 1) {
			if (i % options.total_workers !== options.worker_id) {
				continue;
			}

			const partial = [echoes[i]];
			yield* generate_combinations(echoes, input.combination_length, i + 1, partial);
		}
	}

	for (const combination of generate_worker_combination()) {
		batch.push(combination);
		processed += 1;

		send_batch();

		if (processed % report_size === 0) {
			// yield control to allow message processing
			await new Promise(resolve => setTimeout(resolve, 0));
		}
	}

	// send any remaining combinations
	send_batch(true);
	self.postMessage({ type: 'complete', processed });
}