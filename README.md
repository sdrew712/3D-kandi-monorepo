## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Run the stacks:

```bash
pnpm dev
```

Run the web server:

```bash
cd packages/web/
pnpm dev
```

## Deploy web server

npx sst bind --stage prod npx sst build
npx sst deploy --region us-west-2 --stage prod


## Deploy graph

```bash
npx sst deploy --stage prod
```

## Setting secrets

```bash
npx sst secrets set <NAME_OF_SECRET> "<VALUE_OF_SECRET>"
```
