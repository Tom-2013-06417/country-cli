import { fetchCountries } from './api/index.js';
import { transformCountries } from './transformers/index.js';

const response = await fetchCountries({ query: { region: 'Europe' } });
const countries = transformCountries(response);

console.log(JSON.stringify(countries, null, 2));
console.log(`Transformed ${countries.length} countries`);
