import { fetchCountries, transformCountries } from './api/country/index.js';
import { writeHtml, writeCSV } from './generators/index.js';

// AI-generated
function parseArgs(argv) {
  let subregion = null;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--region') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) {
        throw new Error(
          'Missing value for --region. Example: --region "Northern Europe"',
        );
      }
      subregion = value.trim();
      if (!subregion) {
        throw new Error(
          'Empty value for --region. Example: --region "Northern Europe"',
        );
      }
      i += 1;
      continue;
    }

    if (arg.startsWith('--')) {
      throw new Error(`Unknown argument: ${arg}`);
    }

    throw new Error(
      `Unexpected argument: ${arg}. Example: node index.js --region "Northern Europe"`,
    );
  }

  return { subregion };
}

export async function run(argv = process.argv.slice(2)) {
  const { subregion } = parseArgs(argv);
  const outputDir = process.env.OUTPUT_DIR || './output';
  const maxPaginationSize = Number(
    process.env.DEFAULT_MAX_PAGINATION_SIZE || 100,
  );

  // AI-generated
  if (!Number.isFinite(maxPaginationSize) || maxPaginationSize < 1) {
    throw new Error('DEFAULT_MAX_PAGINATION_SIZE must be a positive number');
  }

  const query = {
    region: 'Europe',
    limit: maxPaginationSize,
  };

  if (subregion) {
    query.subregion = subregion;
  }

  const response = await fetchCountries({ query });
  const countries = transformCountries(response);

  if (countries.length === 0) {
    throw new Error(
      subregion
        ? `No European countries found for sub-region "${subregion}". Check the spelling (e.g. "Northern Europe").`
        : 'No countries found for Europe.',
    );
  }

  await writeHtml(countries, outputDir);
  await writeCSV(countries, outputDir);

  const scope = subregion
    ? `sub-region "${subregion}"`
    : 'Europe';

  console.log(
    `Fetched ${countries.length} countries (${scope}). Files written to ${outputDir}.`,
  );
}
