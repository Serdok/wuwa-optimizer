import type { Echo } from '$lib/data/echoes/types';
import type { DamageResult, OptimizerRequest, OptimizerOptions } from '$lib/data/optimizer/types';
import { BoundedMaxPriorityQueue } from '$lib/optimizer/bounded_max_priority_queue';
import { combination_count } from '$lib/math';
import { compute_damage } from '$lib/optimizer/build';

import OptimizerWorker from './worker?worker';
import type { CharacterKey, Characters } from '$lib/data/characters/types';
import type { WeaponKeysFor, WeaponType } from '$lib/data/weapons/types';

type BatchResult = { combinations: Echo[][]; processed: number };

export type CostCombo = {
	count_4: number;
	count_3: number;
	count_1: number;
	total_items: number;
	total_cost: number;
	pattern: number[];
};

type WorkerData<CK extends CharacterKey, WT extends WeaponType & Characters[CK]['weapon_type'], WK extends WeaponKeysFor<WT>> = {
	echoes: { cost_4: Echo[]; cost_3: Echo[]; cost_1: Echo[] };
	cost_combo: CostCombo;
	request: OptimizerRequest<CK, WT, WK>;
	options: { batch_size: number; report_size: number; total_workers: number; worker_id: number };
}

function generate_cost_combinations<CK extends CharacterKey, WT extends WeaponType & Characters[CK]['weapon_type'], WK extends WeaponKeysFor<WT>>(request: OptimizerRequest<CK, WT, WK>) {
	const cost_combos: CostCombo[] = [];

	for (let count_4 = 0; count_4 <= 3; count_4 += 1) {
		for (let count_3 = 0; count_3 <= 5; count_3 += 1) {
			const remaining_slots = 5 - count_4 - count_3;
			if (remaining_slots < 0) continue;

			const possible_1 = Math.min(remaining_slots, 5);
			for (let count_1 = 0; count_1 <= possible_1; count_1 += 1) {
				const total_items = count_4 + count_3 + count_1;
				const total_cost = count_4 * 4 + count_3 * 3 + count_1;

				if (total_cost < 0 || total_cost > 12) continue;
				if (!request.echos.partial_build_allowed && total_items !== 5) continue;

				cost_combos.push({
					count_4,
					count_3,
					count_1,
					total_items,
					total_cost,
					pattern: [...Array(count_4).fill(4), ...Array(count_3).fill(3), ...Array(count_1).fill(1)]
				});
			}
		}
	}

	return cost_combos;
}

export function optimize<CK extends CharacterKey, WT extends WeaponType & Characters[CK]['weapon_type'], WK extends WeaponKeysFor<WT>>(echoes: Echo[], request: OptimizerRequest<CK, WT, WK>, options: OptimizerOptions) {
	const defaults = {
		batch_size: 50,
		report_size: 10000,
		progress_update_interval: 1000,
	};

	const settings = { ...defaults, ...options };
	const max_workers = options.max_workers || Math.max(12, (navigator.hardwareConcurrency || 4) - 1);

	const cost_4 = echoes.filter(e => e.cost === 4 && request.echos.allowed_primary_stats[e.cost].includes(e.primary_stat.stat));
	const cost_3 = echoes.filter(e => e.cost === 3 && request.echos.allowed_primary_stats[e.cost].includes(e.primary_stat.stat));
	const cost_1 = echoes.filter(e => e.cost === 1 && request.echos.allowed_primary_stats[e.cost].includes(e.primary_stat.stat));

	const cost_combos = generate_cost_combinations(request);
	cost_combos.sort((a, b) => b.total_cost - a.total_cost);

	const expected = cost_combos.reduce((acc, cost_combo) => {
		const { count_4, count_3, count_1 } = cost_combo;

		return acc + (combination_count(cost_4, count_4) * combination_count(cost_3, count_3) * combination_count(cost_1, count_1));
	}, 0);
	const workers_count = Math.min(cost_combos.length, max_workers);

	let total_processed = 0;
	let completed_workers = 0;


	const queue = new BoundedMaxPriorityQueue<DamageResult>(request.keep_count, r => r.target);
	// const results: DamageResult[] = [];

	const workers: Worker[] = [];
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
				current: queue.toArray(),
				total: expected,
				processed: workers_progress.reduce((p, acc) => acc + p, 0),
				progress: [...workers_progress],
				remaining_workers: workers_count - completed_workers
			});

			last_progress_update = now;
			is_progress_update_scheduled = false;
		}
	}

	function on_batch(event: MessageEvent, i: number) {
		const { combinations, processed } = event.data as BatchResult;

		workers_progress[i] = processed;

		// const filtered = combinations.filter(build => is_valid_combination(build, input.filter));
		const damages = combinations.map(build => compute_damage(build, request));
		// results.push(...damages);
		for (const damage of damages) {
			queue.fixed_enqueue(damage);
		}

		if (settings.on_batch) {
			settings.on_batch({ batch: queue.toArray() });
		}

		total_processed += combinations.length;
		update_progress();
	}

	function on_complete(event: MessageEvent, i: number) {
		const { processed } = event.data;
		console.log(`worker ${i} finished: ${processed} combinations`);
		completed_workers += 1;

		workers_progress[i] = processed;
		update_progress();

		if (completed_workers === workers_count) {
			const final = workers_progress.reduce((p, acc) => acc + p, 0);
			console.log(`all workers completed: ${final} combinations found out of ${expected} expected`);

			if (settings.on_complete) {
				settings.on_complete({ total: expected, processed: final, completed: true, cancelled: false });
			}
		}
	}

	// update_progress();
	for (let i = 0; i < workers_count; i += 1) {
		const worker = new OptimizerWorker();
		workers.push(worker);

		worker.onmessage = (event: MessageEvent) => {
			switch (event.data.type) {
				case 'batch': {
					on_batch(event, i);
					break;
				}
				case 'complete': {
					on_complete(event, i);
					worker.terminate();
					break;
				}
				default:
					console.warn('unexpected type', event.data.type);
			}
		};

		worker.onmessageerror = console.warn;

		const worker_options = {
			batch_size: settings.batch_size,
			report_size: settings.report_size,
			total_workers: workers_count,
			worker_id: i,
		};

		const cost_combo = cost_combos[i];
		const sanitized = structuredClone({ echoes: { cost_4, cost_3, cost_1 }, cost_combo, request, options: worker_options });
		worker.postMessage(sanitized satisfies WorkerData<CK, WT, WK>);
	}

	return {
		// get_results: () => results,
		cancel_all: () => {
			workers.forEach((worker) => worker.terminate());
			if (settings.on_complete) {
				settings.on_complete({ total: expected, processed: total_processed, completed: false, cancelled: true });
			}
		}
	};
}
