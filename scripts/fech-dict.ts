const dictRes = await fetch(`https://github.com/oguna/migemo-compact-dict-latest/raw/refs/heads/master/migemo-compact-dict`);
if (!dictRes.ok) {
	throw new Error(`Failed to fetch dict: ${dictRes.statusText}`);
}

const dictBuf = await dictRes.arrayBuffer();

await Bun.write('./dict/migemo-compact-dict', dictBuf);
