import { fetchCountries, transformCountries } from './api/country/index.js';
import { writeHtml, writeCSV } from './generators/index.js';

const response = await fetchCountries({ query: { region: 'Europe' } });
const countries = transformCountries(response);

const htmlPath = await writeHtml(countries, process.env.OUTPUT_DIR);
console.log(`Wrote ${htmlPath}`);

const csvPath = await writeCSV(countries, process.env.OUTPUT_DIR);
console.log(`Wrote ${csvPath}`);
