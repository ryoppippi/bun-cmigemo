import { resolve } from 'node:path';
import { cc } from 'bun:ffi';
import { stringToUint8Array } from 'uint8array-extras';

const cmigemoRoot = resolve(__dirname, './koron-cmigemo/');
const cmigemoSrc = resolve(cmigemoRoot, 'src/');

export const {
	symbols: {
		migemoRun,
		migemoOpen,
	},
} = cc({
	source: './main.c',
	library: ['c', 'migemo'],
	flags: [`-L${cmigemoRoot}`],
	include: [cmigemoSrc, cmigemoRoot],
	symbols: {
		migemoOpen: {
			returns: 'int',
			args: ['buffer'],
		},
		migemoRun: {
			returns: 'int',
			args: ['buffer', 'buffer'],
		},
	},
});

const m = migemoOpen(stringToUint8Array(resolve(__dirname, './dict/migemo-compact-dict')));

migemoRun(
	stringToUint8Array(resolve(__dirname, './dict/migemo-compact-dict')),
	stringToUint8Array('nezu'),
);
