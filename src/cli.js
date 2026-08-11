import { fetchCountries, transformCountries } from './api/country/index.js';
import { writeHtml } from './generators/index.js';

const response = await fetchCountries({ query: { region: 'Europe' } });
const countries = transformCountries(response);

const htmlPath = await writeHtml(countries, process.env.OUTPUT_DIR);
console.log(`Wrote ${htmlPath}`);
