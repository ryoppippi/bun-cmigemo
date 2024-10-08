#! /usr/bin/env bun

import process from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import { cc } from 'bun:ffi';
import { cli } from 'cleye';
import { stringToUint8Array } from 'uint8array-extras';

const cmigemoRoot = resolve(__dirname, './koron-cmigemo/');
const cmigemoSrc = resolve(cmigemoRoot, 'src/');

export const {
	symbols: { migemoRun },
} = cc({
	source: './main.c',
	library: ['c', 'migemo'],
	flags: [`-L${cmigemoRoot}`],
	include: [cmigemoSrc, cmigemoRoot],
	symbols: {
		migemoRun: {
			returns: 'int',
			args: ['buffer', 'buffer'],
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

	migemoRun(
		stringToUint8Array(dictPath),
		stringToUint8Array(query),
	);
}
