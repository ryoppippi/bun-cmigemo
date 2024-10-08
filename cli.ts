#! /usr/bin/env bun

import process from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import { cli } from 'cleye';
import { Migemo } from './lib';

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

	{
		using migemo = new Migemo(dictPath);
		migemo.query(query, s => console.log(s));
	}
}
