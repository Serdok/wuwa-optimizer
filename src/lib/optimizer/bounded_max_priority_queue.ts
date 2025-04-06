import { type IGetCompareValue, MaxPriorityQueue } from '@datastructures-js/priority-queue';

export class BoundedMaxPriorityQueue<T> extends MaxPriorityQueue<T> {
	#compare: IGetCompareValue<T>;
	#max_size: number;

	constructor(max_size = 10, compare: IGetCompareValue<T>) {
		super(compare);
		this.#compare = compare;
		this.#max_size = max_size;
	}

	fixed_enqueue(value: T): BoundedMaxPriorityQueue<T> {
		if (this.size() < this.#max_size) {
			this.enqueue(value);
			return this;
		}

		const last = this.back()!;
		if (this.#compare(value) > this.#compare(last)) {
			// pop the last item
			const values = this.toArray();
			this.clear();
			values.pop();
			values.forEach(v => this.enqueue(v));
			this.enqueue(value);
		}

		return this;
	}
}