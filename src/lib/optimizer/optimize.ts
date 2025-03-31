import { combination_count } from '$lib/math';

import OptimizerWorker from './worker?worker';
import type { Echo } from '$lib/data/echoes/types';
import { compute_damage, type DamageResult, is_valid_combination } from '$lib/optimizer/build';
import type { OptimizerInput, OptimizerOptions } from '$lib/optimizer';

type BatchResult = { combinations: Echo[][], processed: number };

export function optimize(echoes: Echo[], input: OptimizerInput, options: OptimizerOptions) {
	console.log(echoes);

	const defaults = {
		batch_size: 1000,
		progress_update_interval: 2000,
		on_progress: null,
		on_batch: null,
		on_complete: null,
	};

	const settings = {...defaults, ...options};
	const workers_count = options.workers_count || Math.max(12, (navigator.hardwareConcurrency || 4) - 1);

	const expected = combination_count(echoes, 5);
	// if (input.filter.allow_partial) {
	// 	expected += combination_count(echoes, 4);
	// 	expected += combination_count(echoes, 3);
	// 	expected += combination_count(echoes, 2);
	// 	expected += combination_count(echoes, 1);
	// }
	console.log(`expected: ${expected}`);

	let total_processed = 0;
	let completed_workers = 0;
	const results: DamageResult[] = [];

	const workers_progress = Array(workers_count).fill(0);
	let last_progress_update = performance.now();
	let is_progress_update_scheduled = false;

	function update_progress() {
		if (!settings.on_progress) return;

		const now = performance.now();
		if (!is_progress_update_scheduled) {
			// schedule next update
			setTimeout(update_progress, settings.progress_update_interval - (now - last_progress_update));
			is_progress_update_scheduled = true;
			return;
		}

		if (now - last_progress_update >= settings.progress_update_interval) {
			settings.on_progress({
				current: results,
				total: expected,
				processed: total_processed,
				progress: [...workers_progress],
				remaining_workers: workers_count - completed_workers,
			});

			last_progress_update = now;
			is_progress_update_scheduled = false;
		}
	}

	function on_batch(data: MessageEvent['data'], i: number) {
		const { combinations, processed } = data as BatchResult;

		workers_progress[i] = processed;

		const filtered = combinations.filter(build => is_valid_combination(build, input.filter));
		const damages = filtered.map(build => compute_damage(build, input, options));

		results.push(...damages);
		if (settings.on_batch) {
			settings.on_batch({ batch: damages });
		}

		total_processed += combinations.length;
		update_progress();
	}

	function on_complete(data: MessageEvent['data'], i: number) {
		const { processed } = data;
		console.log(`worker ${i} finished: ${processed} combinations`);
		completed_workers += 1;

		workers_progress[i] = processed;
		update_progress();

		if (completed_workers === workers_count) {
			console.log(`all workers completed: ${total_processed} combinations found out of ${expected} expected`);

			if (settings.on_complete) {
				settings.on_complete({ total: expected, processed: total_processed, completed: true, cancelled: false, });
			}
		}
	}


	const workers: Worker[] = [];
	for (let i = 0; i < workers_count; i += 1) {
		const worker = new OptimizerWorker();
		workers.push(worker);

		worker.onmessage = (event: MessageEvent) => {
			switch (event.data.type) {
				case 'batch': {
					on_batch(event.data, i);
					break;
				}
				case 'complete': {
					on_complete(event.data, i);
					worker.terminate();
					break;
				}
				default: console.warn('unexpected type', event.data.type);
			}
		}
		worker.onmessageerror = (event: MessageEvent) => { console.warn(event); }

		const worker_options = {
			batch_size: settings.batch_size,
			report_size: settings.report_size,
			total_workers: workers_count,
			worker_id: i,
		};
		worker.postMessage({ echoes, input: {...input, combination_length: 5}, options: worker_options });
	}

	return {
		// get_results: () => results,
		cancel_all: () => {
			workers.forEach(worker => worker.terminate());
			if (settings.on_complete) {
				settings.on_complete({ total: expected, processed: total_processed, completed: false, cancelled: true, });
			}
		}
	}
}