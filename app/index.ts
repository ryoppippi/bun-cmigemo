import type { Serve } from 'bun';
import { Hono } from 'hono';
import { Migemo } from '../lib';
import html from './index.html';

const app = new Hono();
using migemo = new Migemo('../utf-8/migemo-dict');

app.post('/api', async (c) => {
	const { query }: { query: string } = await c.req.json();
	let result: string = '';
	const start = performance.now();
	migemo.query(query, (s) => {
		result = s;
	});
	const end = performance.now();
	return c.json({
		result,
		time: end - start,
	});
});

export default ({
	...app,
	static: {
		'/': html as Response,
	},
}) satisfies Serve;
