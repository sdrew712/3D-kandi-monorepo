This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, spin up the SST stack:

```bash
pnpm sst dev
```

Then, run the development server:

```bash
pnpm dev
```

Run the graphql server:

```bash
cd packages/core/graphql
ts-node index.ts
```

Run the web server:

```bash
cd cd packages/web/
pnpm devs
```

Deploy the stack:

```bash
npx sst deploy --stage prod
```
