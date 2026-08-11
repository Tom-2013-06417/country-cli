import { fetchCountries } from './api/index.js';

// Orchestration goes here later (fetch → transform → generate).
const countries = await fetchCountries({ query: { region: 'Europe' } });
console.log(countries);
