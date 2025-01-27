const input = document.querySelector('input')!;
const time = document.querySelector('#time')!;
const result = document.querySelector('#result')!;

// eslint-disable-next-line ts/no-misused-promises
input.addEventListener('input', async (_e) => {
	const e = _e as InputEvent;

	const res = await fetch('/api', {
		method: 'POST',
		body: JSON.stringify({ query: e.data ?? '' }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const json = await res.json() as { result: string; time: number };
	time.innerHTML = `Time: ${json.time}ms`;
	result.innerHTML = json.result;
});
