import { describe, it, expect } from 'vitest';
import { BoundedMaxPriorityQueue } from './bounded_max_priority_queue';


type Item = {
	name: string;
	age: number;
};

describe('bounded max priority queue', () => {
	it('works', () => {

		const queue = new BoundedMaxPriorityQueue<Item>(3, i => i.age);

		queue.fixed_enqueue({ name: 'a', age: 10 });
		queue.fixed_enqueue({ name: 'a', age: 5 });
		queue.fixed_enqueue({ name: 'a', age: 45 });

		expect(queue.size()).toEqual(3);
		expect(queue.dequeue()).toEqual({ name: 'a', age: 45 });
		expect(queue.dequeue()).toEqual({ name: 'a', age: 10 });
		expect(queue.dequeue()).toEqual({ name: 'a', age: 5 });
	});

	it('ignores a low value', () => {

		const queue = new BoundedMaxPriorityQueue<Item>(3, i => i.age);

		queue.fixed_enqueue({ name: 'a', age: 5 });
		queue.fixed_enqueue({ name: 'a', age: 10 });
		queue.fixed_enqueue({ name: 'a', age: 3 });
		queue.fixed_enqueue({ name: 'a', age: 45 });

		expect(queue.size()).toEqual(3);
		expect(queue.dequeue()).toEqual({ name: 'a', age: 45 });
		expect(queue.dequeue()).toEqual({ name: 'a', age: 10 });
		expect(queue.dequeue()).toEqual({ name: 'a', age: 5 });
	});
});