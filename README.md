# bun-cmigemo

Run [cmigemo](https://github.com/koron/cmigemo) in Bun.

https://github.com/user-attachments/assets/98da72af-7831-453a-ba97-fed938707d00

## これは何

[cmigemo](https://github.com/koron/cmigemo) を [Bun](https://bun.sh/blog/compile-and-run-c-in-js) でコンパイルして動かすサンプルプロジェクトです。

To install dependencies:

```bash
bun i bun-cmigemo
bun pm trust bun-cmigemo
```

To run:

```bash
bun main <query>

# example
bun main nezu
> C/Migemo: ([鼡子鼠]|ﾈｽﾞ|ネズ|杜松|禰津|根津|ねず|ｎｅｚｕ|nezu)
```

This project was created using `bun init` in bun v1.1.29.

## Example App

```bash
bun app
open http://localhost:3000
```

https://github.com/user-attachments/assets/8d728cc8-4a15-402c-87e7-950ca083725e

## Limitations

This is obvious but it runs on only Bun.

## License

MIT
