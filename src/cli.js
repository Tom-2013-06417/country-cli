import { fetchCountries, transformCountries } from './api/country/index.js';
import { writeHtml, writeCSV } from './generators/index.js';

export async function run() {
  const outputDir = process.env.OUTPUT_DIR || './output';

  const response = await fetchCountries({ query: { region: 'Europe' } });
  const countries = transformCountries(response);

  await writeHtml(countries, outputDir);
  await writeCSV(countries, outputDir);

  console.log(
    `Fetched ${countries.length} countries. Files written to ${outputDir}.`,
  );
}
