import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatCurrencies, formatLanguages } from '../formatters/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// AI-generated
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

// AI-generated
function buildTable(countries) {
  const rows = countries
    .map((country) => {
      const flagCell = country.flag
        ? `<img class="flag" src="${escapeHtml(country.flag)}" alt="" />`
        : '<span class="flag-placeholder">N/A</span>';

      const capital = country.capital ?? 'N/A';
      const capitalHtml = country.capital
        ? escapeHtml(country.capital)
        : '<span class="empty">N/A</span>';

      const languages = formatLanguages(country.languages) || 'N/A';
      const currencies = formatCurrencies(country.currencies) || 'N/A';

      return `<tr
  data-name="${escapeAttr(country.name)}"
  data-capital="${escapeAttr(capital)}"
  data-population="${escapeAttr(String(country.population))}"
  data-languages="${escapeAttr(languages)}"
  data-currencies="${escapeAttr(currencies)}"
  data-flag="${country.flag ? '1' : '0'}"
>
  <td>${flagCell}</td>
  <td class="country-name">${escapeHtml(country.name)}</td>
  <td>${capitalHtml}</td>
  <td class="num">${escapeHtml(country.population.toLocaleString('en-US'))}</td>
  <td>${languages === 'N/A' ? '<span class="empty">N/A</span>' : escapeHtml(languages)}</td>
  <td>${currencies === 'N/A' ? '<span class="empty">N/A</span>' : escapeHtml(currencies)}</td>
</tr>`;
    })
    .join('\n');

  return `<div class="table-wrap">
<table id="countries-table">
  <thead>
    <tr>
      <th class="sortable" data-sort="flag" data-type="number" title="Sort by flag">Flag</th>
      <th class="sortable" data-sort="name" title="Sort by name">Name</th>
      <th class="sortable" data-sort="capital" title="Sort by capital">Capital</th>
      <th class="sortable" data-sort="population" data-type="number" title="Sort by population">Population</th>
      <th class="sortable" data-sort="languages" title="Sort by languages">Languages</th>
      <th class="sortable" data-sort="currencies" title="Sort by currencies">Currencies</th>
    </tr>
  </thead>
  <tbody>
${rows}
  </tbody>
</table>
</div>`;
}

// AI-generated
export function generateHtml(countries) {
  const template = fs.readFileSync(
    path.join(__dirname, 'template.html'),
    'utf8',
  );
  const styles = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
  const searchScript = fs.readFileSync(
    path.join(__dirname, 'search.js'),
    'utf8',
  );
  const sortScript = fs.readFileSync(path.join(__dirname, 'sort.js'), 'utf8');

  return template
    .replace('{{STYLES}}', styles)
    // AI-generated
    .replace(
      '{{GENERATED_AT}}',
      escapeHtml(
        new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'long',
        }),
      ),
    )
    .replace('{{TABLE}}', buildTable(countries))
    .replace('{{TABLE_SCRIPT}}', `${searchScript}\n${sortScript}`);
}

// AI-generated
export async function writeHtml(countries, outputDir) {
  const html = generateHtml(countries);
  const outPath = path.join(outputDir, 'countries.html');

  await fs.promises.mkdir(outputDir, { recursive: true });
  await fs.promises.writeFile(outPath, html, 'utf8');

  return outPath;
}
