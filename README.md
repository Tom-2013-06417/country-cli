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
index.js                 Entry point (`node index.js`)
src/
  cli.js                 Orchestrates fetch → transform → generate
  config.js              App settings derived from environment variables
  utils/                 Shared helpers (e.g. loading `.env`)
  api/
    index.js             Re-exports resource modules
    [resource]/           One folder per external API resource
      fetch.js           HTTP calls to that resource (URL, headers, errors)
      transform.js       Maps raw API payloads into a stable app shape
      index.js           Barrel file (re-exports fetch + transform)
  generators/
    index.js             Barrel file for generators
    html/
      template.html      HTML boilerplate with {{STYLES}} / {{TABLE}}
      styles.css         Report styles (inlined into the output HTML)
      generate.js        Loads template + CSS, builds the countries table
      index.js           Barrel file
    csv/
      generate.js        Builds the CSV string and writes countries.csv
      index.js           Barrel file
```

Add a new API resource by creating another `[resource]/` folder with the same three files; keep output formatting in `generators/`.
