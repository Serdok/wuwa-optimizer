import type { OptimizerInput, OptimizerOptions } from '$lib/optimizer';

import { db } from '$lib/db';
import { combination_count } from '$lib/optimizer/build';

import { WorkerPool, type WorkerResult, type WorkerTask } from '$lib/optimizer/worker_pool';
import { toast } from 'svelte-sonner';

type ProgressCallback = (result: WorkerResult | null, done: boolean) => void;

export async function optimize(context: OptimizerInput, options: OptimizerOptions, on_progress: ProgressCallback) {
	const echoes = await db.echoes.toArray();

	// todo: apply more filters?
	console.log(echoes);
	const filtered_echoes = echoes.filter(e => context.filter.allowed_primary_stats[e.cost].includes(e.primary_stat.stat));

	if (filtered_echoes.length === 0) {
		on_progress(null, true);
		toast.message('no echoes!');
		return;
	}

	// initialize workers
	const threads = Math.min(24, navigator.hardwareConcurrency - 1); // leave 1 core available!
	options.pool = options.pool ?? new WorkerPool(threads);

	// todo: update total count with filters?
	const total_count = combination_count(filtered_echoes, 5);
	console.log('main', filtered_echoes, total_count);

	const task: WorkerTask = {
		input: {
			echoes: filtered_echoes,
			input: context,
			options,
		},
		report_progress: (result) => {
			on_progress(result, false);
		}
	};

	options.pool.enqueue(task);
}