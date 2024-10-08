/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import { Hono } from 'hono';
import { html } from 'hono/html';
import { Migemo } from '../lib';

const app = new Hono();
using migemo = new Migemo('../utf-8/migemo-dict');

async function App() {
	return (
		<html>
			<head>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css" type="text/css"/>
			</head>
			<h1> CMigemo Demo </h1>
			<input type="text" />
			<div id="time"></div>
			<div id="result"></div>
			<script>
				{html` 
      const input = document.querySelector('input');
      input.addEventListener('input', async (e) => {
        console.log(e.target.value);
        const res = await fetch('/api', {
          method: 'POST',
          body: JSON.stringify({ query: e.target.value }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await res.json();

		time.innerHTML = 'Time: ' + json.time + 'ms';

        result.innerHTML = json.result
	  });
`}
			</script>
		</html>
	);
}

app.get('/', async (c) => {
	return c.html(<App />);
});

app.post('/api', async (c) => {
	const { query }: { query: string } = await c.req.json();
	using migemo = new Migemo();
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

export default app;
