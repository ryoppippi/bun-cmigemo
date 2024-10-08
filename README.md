# bun-cmigemo

[![npm version](https://img.shields.io/npm/v/bun-cmigemo?color=yellow)](https://npmjs.com/package/bun-cmigemo)
[![npm downloads](https://img.shields.io/npm/dm/bun-cmigemo?color=yellow)](https://npmjs.com/package/bun-cmigemo)

Run [`cmigemo`](https://github.com/koron/cmigemo) with [`Bun cc`](https://bun.sh/docs/api/cc).

https://github.com/user-attachments/assets/98da72af-7831-453a-ba97-fed938707d00

## What is this?

This package allows you to run [`cmigemo`](https://github.com/koron/cmigemo) with [`Bun cc`](https://bun.sh/docs/api/cc).

Bun has an experimental compiler called [`Bun cc`](https://bun.sh/docs/api/cc), which enables you to run C code in Bun with low overhead. `cmigemo` is written in C, and if you want to use it in Bun, you need to compile it. However, by wrapping C code with `Bun cc`, you can run it in Bun without the need for explicit compilation! Amazing, right?

So, this package is essentially a wrapper around `cmigemo`, but you don't need to compile it!

There are also other implementations of `migemo`, such as [`jsmigemo`](https://github.com/oguna/jsmigemo) and [`rustmigemo`](https://github.com/oguna/rustmigemo), which are written in JavaScript and Rust, respectively, allowing you to run them in Node or even in the browser!

So... WTH does this package exist? Well, it's just for fun! 😄

## Usage

To install dependencies:

```bash
bun i bun-cmigemo
bun pm trust bun-cmigemo
```

Then, you can use it like this:

```ts
import { Migemo } from 'bun-cmigemo';

const dictPath = '/absolute/path/to/dict';
{
	using migemo = new Migemo(dictPath);

	migemo.query(query, s => console.log(s));
}
```

## CLI

You can also use the CLI:

```bash
bun x bun-cmigemo -d path/to/dict 'query'
bun x bun-cmigemo --help
```

## Example App

This repo includes an example web app that uses `bun-cmigemo`.

You can run it like this:

```bash
git clone https://github.com/ryoppippi/bun-cmigemo
cd bun-cmigemo
bun i
bun app
open http://localhost:3000
```

https://github.com/user-attachments/assets/8d728cc8-4a15-402c-87e7-950ca083725e

## Limitations

This is obvious but it runs on only Bun.

## License

MIT
