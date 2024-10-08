import process from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import type { Pointer } from 'bun:ffi';
import { CString, JSCallback, cc } from 'bun:ffi';
import { stringToUint8Array } from 'uint8array-extras';

const cmigemoRoot = resolve(__dirname, '../koron-cmigemo/');
const cmigemoSrc = resolve(cmigemoRoot, 'src/');
const defaultDict = resolve(__dirname, '../utf-8/migemo-dict');

export const {
	symbols: {
		migemoOpen,
		migemoQuery,
		migemoClose,
	},
} = cc({
	source: './main.c',
	library: ['c', 'migemo'],
	flags: [`-L${cmigemoRoot}`],
	include: [cmigemoSrc, cmigemoRoot],
	symbols: {
		migemoOpen: {
			returns: 'ptr',
			args: ['cstring'],
		},
		migemoQuery: {
			returns: 'int',
			args: ['ptr', 'cstring', 'callback'],
		},
		migemoClose: {
			returns: 'int',
			args: ['ptr'],
		},
	},
});

/**
 * wrapper for cmigemo
 *
 * @param dictPath - path to the migemo dict file. Should be an absolute path.
 *
 * @example
 * ```ts
 * import { Migemo } from './lib';
 *
 * {
 *   using migemo = new Migemo('./migemo-dict');
 *   migemo.query('hoge', (s) => console.log(s));
 * }
 * ```
 */
export class Migemo {
	#m: Pointer;

	constructor(dictPath: string = defaultDict) {
		const dict = isAbsolute(dictPath) ? dictPath : resolve(process.cwd(), dictPath);
		const m = migemoOpen(stringToUint8Array(dict));
		if (m === null) {
			throw new Error('Failed to open migemo');
		}
		this.#m = m;
	}

	[Symbol.dispose]() {
		migemoClose(this.#m);
	}

	query(query: string, callback: (s: string) => void) {
		const printIterator = new JSCallback(
			(ptr: Pointer) => {
				const s = new CString(ptr);
				callback(s.toString());
			},
			{
				returns: 'void',
				args: ['ptr'],
			},
		);

		migemoQuery(
			this.#m,
			stringToUint8Array(query),
			printIterator.ptr,
		);

		printIterator.close();
	}
}
