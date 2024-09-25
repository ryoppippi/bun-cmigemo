import { resolve } from 'node:path';
import { cc } from 'bun:ffi';

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
			args: [],
		},
	},
});

migemoRun();
