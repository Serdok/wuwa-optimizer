import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type WithoutChild<T> = T extends { child?: unknown } ? Omit<T, 'child'> : T;
export type WithoutChildren<T> = T extends { children?: unknown } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

type Primitive = string | number | boolean | bigint | symbol | undefined | null;
export type Nullable<T> = T | null;
export type DeepReadonly<T> = {
	readonly [Prop in keyof T]: T[Prop] extends object ? DeepReadonly<T[Prop]> : T[Prop];
};
export type DeepWritable<T> =
	T extends Primitive ? T :
	T extends ReadonlyArray<infer U> ? Array<DeepWritable<U>> :
	T extends object ? { -readonly [Prop in keyof T]: DeepWritable<T[Prop]> } :
	T;

export function deep_freeze<T extends object>(value: T): DeepReadonly<T> {
	if (value) {
		Object.freeze(value);
		for (const key in value) {
			const prop = value[key];
			if (prop && ['object', 'function'].includes(typeof prop) && !Object.isFrozen(prop)) {
				deep_freeze(prop);
			}
		}
	}

	return value;
}

export function deep_clone<T>(obj: T): T {
	try {
		return structuredClone(obj);
	} catch { /* fallthrough function-aware clone */ }

	const seen = new WeakMap<object, unknown>();
	const is_object = (v: unknown): v is object => typeof v === 'object' && v !== null;

	const is_pojo = (v: object) => {
		const proto = Object.getPrototypeOf(v);
		return proto === Object.prototype || proto === null;
	};

	const recursive_clone = <U>(value: U): U => {
		const type = typeof value;
		if (value == null || ['string', 'number', 'boolean', 'symbol', 'bigint'].includes(type)) {
			return value;
		}
		if (type === 'function') {
			return value;
		}

		if (!is_object(value)) return value;

		if (seen.has(value)) return seen.get(value) as U;

		if (Array.isArray(value)) {
			const out = new Array(value.length);
			seen.set(value, out);
			for (let i = 0; i < value.length; i++) {
				out[i] = recursive_clone(value[i]);
			}
			return out as U;
		}

		if (!is_pojo(value)) {
			return structuredClone(value);
		}

		const out = Object.create(Object.getPrototypeOf(value));
		seen.set(value, out);
		for (const key in value) {
			out[key] = recursive_clone(value[key]);
		}
		return out as U;
	};

	return recursive_clone(obj);
}


export type Schema<T, K extends keyof T> = T[K] extends PropertyKey ? Record<T[K], T> : never;
export type ExtractPropFromArray<T extends readonly unknown[], K extends keyof T[number]> = K extends PropertyKey ? T[number][K] : never;

export function create_schema<T, K extends keyof T>(item: T, key: K) {
	return { [key]: item } as Schema<T, K>;
}

export function create_schema_from_array<T, K extends keyof T>(items: readonly T[], key: K) {
	return items.reduce((acc, item) => {
		const prop = item[key] as PropertyKey;
		acc[prop] = item;
		return acc;
	}, {} as Record<PropertyKey, T>) as Schema<T, K>;
}
