export {};

declare global {
	interface Window {
		gameVolume: number;
	}

	interface Array<T> {
		findLastIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: unknown): number;
	}
}
