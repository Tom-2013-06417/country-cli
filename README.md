# Countries CLI

CLI that fetches country data from the [REST Countries API](https://restcountries.com/), processes it, and writes HTML and CSV files to `output/`.

This repo tries to fetch countries using only vanilla nodejs

## Requirements

- Node.js 20+

## Get an API key

REST Countries requires an API key for authenticated requests.

1. Create a free account at [restcountries.com/sign-up](https://restcountries.com/sign-up).
2. Log in and open the **API Keys** page in your account.
3. Copy your key (it looks like `rc_live_…`).
4. Put it in `.env` (see Setup below). Keep `.env` out of git — never commit the key.

You can also try the public demo key `rc_live_demo` to confirm the API is reachable; for real work, use your own key.

Docs: [restcountries.com/docs](https://restcountries.com/docs)

## Setup

```bash
cp .env.example .env
```

Then set your key in `.env` (for example `API_KEY=rc_live_…`).

## Run

```bash
node index.js
# or
npm start
```

## Project layout

```text
index.js              Entry point
src/
  cli.js              Orchestration
  config.js           Env / paths
  api/                API fetching
  transformers/       Data processing
  generators/         HTML and CSV output
```
