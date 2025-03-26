import OptimizerWorker from './worker?worker';
import type { Echo } from '$lib/data/echoes/types';
import type { OptimizerContext, OptimizerOptions } from '$lib/optimizer/index';
import type { StatKey } from '$lib/data/stats';
import type { AttackKey, SkillKey } from '$lib/data/characters';

export type WorkerResult = {
	build: Echo[];
	skills: {
		[S in SkillKey]: {
			type: S;
			key: string;
			motions: {
				type: AttackKey;
				key: string;
				non_crit: number[],
				average: number[],
				forced_crit: number[],
			}[];
		};
	};
	build_stats: Record<StatKey, number>;
	display_stats: Record<StatKey, number>;
	final_stats: Record<StatKey, number>;
	target_value: number;
};

export type WorkerTask = {
	input: {
		echoes: Echo[];
		context: OptimizerContext;
		options: OptimizerOptions;
	};

	report_progress: (result: WorkerResult) => void;
};

export class WorkerPool {
	readonly #max_workers: number;
	#active_workers: number;
	#workers: Worker[];
	#queue: WorkerTask[] = [];

	constructor(max_workers: number = 1) {
		console.log('max workers', max_workers);
		this.#max_workers = max_workers;
		this.#active_workers = 0;
		this.#workers = [];
	}

	enqueue(task: WorkerTask) {
		this.#queue.push(task);
		this.process_queue();
	}

	process_queue() {
		if (this.#active_workers >= this.#max_workers) {
			console.log('no workers available');
			return;
		}
		if (this.#queue.length === 0) {
			return;
		}

		const task = this.#queue.shift()!;
		this.create_worker(task);
	}

	create_worker(task: WorkerTask) {
		this.#active_workers += 1;

		const worker = new OptimizerWorker();
		this.#workers.push(worker);

		worker.onmessage = (event: MessageEvent) => {
			if (event.data.type === 'complete') {
				this.release_worker(worker);
				return;
			}

			task.report_progress(event.data);
		};
		worker.onerror = (event: ErrorEvent) => {
			console.warn('worker error', event);
			this.release_worker(worker);
		};

		worker.postMessage(task.input);
	}

	release_worker(worker: Worker) {
		this.#active_workers -= 1;

		const index = this.#workers.indexOf(worker);
		if (index > -1) {
			this.#workers.splice(index, 1);
		}

		worker.terminate();
		this.process_queue();
	}

	terminate() {
		this.#workers.forEach((worker) => worker.terminate());
		this.#workers = [];
		this.#active_workers = 0;
		this.#queue = [];
	}
}
