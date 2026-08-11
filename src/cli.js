import { fetchCountries, transformCountries } from './api/country/index.js';
import { writeHtml, writeCSV } from './generators/index.js';

export async function run() {
  const outputDir = process.env.OUTPUT_DIR || './output';
  const maxPaginationSize = Number(
    process.env.DEFAULT_MAX_PAGINATION_SIZE || 100,
  );

  // AI-generated
  if (!Number.isFinite(maxPaginationSize) || maxPaginationSize < 1) {
    throw new Error('DEFAULT_MAX_PAGINATION_SIZE must be a positive number');
  }

  const response = await fetchCountries({
    query: { region: 'Europe', limit: maxPaginationSize },
  });
  const countries = transformCountries(response);

  await writeHtml(countries, outputDir);
  await writeCSV(countries, outputDir);

  console.log(
    `Fetched ${countries.length} countries. Files written to ${outputDir}.`,
  );
}
