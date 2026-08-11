import fs from 'fs';
import path from 'path';

function formatLanguages(languages) {
  return Object.values(languages ?? {})
    .filter(Boolean)
    .join(', ');
}

function formatCurrencies(currencies) {
  return Object.values(currencies ?? {})
    .map((currency) => {
      if (!currency?.name) return null;
      return currency.symbol
        ? `${currency.name} (${currency.symbol})`
        : currency.name;
    })
    .filter(Boolean)
    .join(', ');
}

// AI-generated
function csvCell(value) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

function buildTable(countries) {
  // Intentionally not using Object.keys(countries[0]) to keep the columns flexible.
  const headerRow = ['Name', 'Capital', 'Population', 'Languages', 'Currencies']
    .map(csvCell)
    .join(',');

  const rows = countries.map((country) => {
    const capital = country.capital ?? '—';
    const languages = formatLanguages(country.languages) || '—';
    const currencies = formatCurrencies(country.currencies) || '—';

    return [
      csvCell(country.name),
      csvCell(capital),
      csvCell(country.population.toLocaleString('en-US')), // This makes the number have commas for readability
      csvCell(languages),
      csvCell(currencies),
    ].join(',');
  });

  return [headerRow, ...rows].join('\n');
}

export async function writeCSV(countries, outputDir) {
  const csvOutput = buildTable(countries);
  const outPath = path.join(outputDir, 'countries.csv');

  await fs.promises.mkdir(outputDir, { recursive: true });
  await fs.promises.writeFile(outPath, csvOutput, 'utf8');

  return outPath;
}
