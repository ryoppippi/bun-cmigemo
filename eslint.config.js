import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	svelte: false,
	ignores: ['third_party'],
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
