# Countries CLI

CLI that fetches country data from the [REST Countries API](https://restcountries.com/), processes it, and writes HTML and CSV files to `output/`.

This repo fetches countries using only vanilla Node.js.

## Requirements

- Node.js **20+**
- A REST Countries API key (see below)

If you already have Node 20+, skip to [Get an API key](#get-an-api-key). Otherwise install Node with **nvm** (Node Version Manager) using the steps below.

### Install Node.js with nvm (macOS / Linux)

1. Check whether Node is already installed:

```bash
node -v
```

If that prints `v20.x` or higher, you're fine — continue to [Get an API key](#get-an-api-key). Otherwise proceed below.

2. Install nvm ([nvm install guide](https://github.com/nvm-sh/nvm#installing-and-updating)):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.6/install.sh | bash
```

3. Reload your shell config (or open a new terminal):

```bash
# zsh (default on modern macOS)
source ~/.zshrc

# bash
# source ~/.bashrc
```

4. Install and use Node 20:

```bash
nvm install 20
nvm use 20
node -v   # should show v20.x or newer
```

### Windows

Use [nvm-windows](https://github.com/coreybutler/nvm-windows), then:

```bash
nvm install 20
nvm use 20
node -v
```

Once `node -v` shows v20+, continue with [Get an API key](#get-an-api-key), then [Setup](#setup), then [Run](#run).

## Get an API key

This project uses the **Countries API v5** (`https://api.restcountries.com/countries/v5`). Older versions (including the legacy `restcountries.com/v3.1` URLs) are deprecated and will not work.

REST Countries requires an API key for authenticated v5 requests.

1. Create a free account at [restcountries.com/sign-up](https://restcountries.com/sign-up).
2. Log in and open the **API Keys** page in your account.
3. Copy your key (it looks like `rc_live_…`).
4. Keep it handy — you'll paste it into `.env` as `COUNTRIES_API_KEY` in [Setup](#setup). Never commit `.env`.

You can try the public demo key `rc_live_demo` only to confirm the API is reachable. Demo responses are sample-shaped and are **not** a full Europe dataset — use your own key for a real run.

Docs: [Countries API (v5)](https://restcountries.com/docs/countries) · [General docs](https://restcountries.com/docs)

## Setup

No need to `npm install`. This project uses only Node.js built-ins.

From the project root (after cloning):

```bash
cd country-cli # or whatever you named the folder
cp .env.example .env
```

Open `.env` and set `COUNTRIES_API_KEY` (required). Other variables are documented with comments in [`.env.example`](.env.example) — adjust them only if you need to.

## Run

```bash
node index.js
# or
npm start
```

Optional: filter European countries by **sub-region** (bonus):

```bash
node index.js --region "Northern Europe"
```

If `--region` is missing a value, or the sub-region does not match any countries, the script prints an error and exits with code `1`.

On success you should see a summary like `Fetched N countries (Europe). Files written to ./output.`, and these files:

- `output/countries.html`
- `output/countries.csv`

## Project layout

```text
index.js                 Entry point (`node index.js`)
src/
  cli.js                 Orchestrates fetch → transform → generate
  utils/                 Shared helpers (e.g. loading `.env`)
  api/
    index.js             Re-exports resource modules
    [resource]/           One folder per external API resource
      fetch.js           HTTP calls to that resource (URL, headers, errors)
      transform.js       Maps raw API payloads into a stable app shape
      index.js           Barrel file
  generators/
    index.js             Barrel file for generators
    formatters/          Display/string formatting for outputs
      countryFields.js   Shared language/currency formatting for HTML + CSV
      index.js           Barrel file
    html/
      template.html      HTML boilerplate with search UI + placeholders
      styles.css         Report styles (inlined into the output HTML)
      search.js          Client-side country name filter (inlined)
      sort.js            Client-side column sorting (inlined)
      generate.js        Loads template + assets, builds the countries table
      index.js           Barrel file
    csv/
      generate.js        Builds the CSV string and writes countries.csv
      index.js           Barrel file
```

Add a new API resource by creating another `[resource]/` folder with the same three files; keep output formatting in `generators/`.
