#! /usr/bin/env bun

import process from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import type { Pointer } from 'bun:ffi';
import { CString, JSCallback, cc } from 'bun:ffi';
import { cli } from 'cleye';
import { stringToUint8Array } from 'uint8array-extras';

const cmigemoRoot = resolve(__dirname, './koron-cmigemo/');
const cmigemoSrc = resolve(cmigemoRoot, 'src/');

export const {
	symbols: {
		migemoRun,
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
		migemoRun: {
			returns: 'int',
			args: ['ptr', 'cstring', 'cstring'],
		},
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

const argv = cli({
	name: 'bun-cmigemo',

	parameters: [
		'<query>',
	],

	flags: {
		dict: {
			type: String,
			alias: 'd',
			description: 'Path to the migemo dict file',
			default: './utf-8/migemo-dict',
		},
	},
});

if (import.meta.main) {
	const { query } = argv._;
	const { dict } = argv.flags;

	const dictPath = isAbsolute(dict) ? dict : resolve(process.cwd(), dict);

	const m = migemoOpen(stringToUint8Array(dictPath));

	const printIterator = new JSCallback(
		(ptr: Pointer) => {
			const s = new CString(ptr);
		},
		{
			returns: 'void',
			args: ['ptr'],
		},
	);

	migemoQuery(
		m,
		stringToUint8Array(query),
		printIterator.ptr,
	);

	printIterator.close();
	migemoClose(m);
}
