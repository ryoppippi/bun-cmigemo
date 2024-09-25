import path from 'node:path';
import { platform } from 'node:os';
import { $ } from 'bun';
import consola from 'consola';

const DOC_URL = `https://github.com/koron/cmigemo/blob/e0f6145f61e0b7058c3006f344e58571d9fdd83a/doc/README_j.txt`;

function success() {
	consola.success('cmigemo build done');
}

/* if not git repository, causes an error */
const gitRoot = await $`git rev-parse --show-toplevel`.text().then(t => t.trim());

$.cwd(path.join(gitRoot, './koron-cmigemo'));

switch (platform()) {
	case 'darwin':
		await $`make osx`.quiet();
		success();
		break;
	case 'linux':
		await $`make gcc`.quiet();
		success();
		break;
	default:
		console.error(`Unsupported platform: ${platform()}. See ${DOC_URL}`);
}
