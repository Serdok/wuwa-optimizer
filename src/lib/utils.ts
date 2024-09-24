export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function object_has_prop<T extends object>(o: T, prop: string): o is Required<T> {
	return Object.hasOwn(o, prop);
}
