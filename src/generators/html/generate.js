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

// AI-generated
function buildTable(countries) {
  const rows = countries
    .map((country) => {
      const flagCell = country.flag
        ? `<img class="flag" src="${escapeHtml(country.flag)}" alt="" />`
        : '<span class="empty">—</span>';

      const capital = country.capital
        ? escapeHtml(country.capital)
        : '<span class="empty">—</span>';

      const languages = formatLanguages(country.languages) || '—';
      const currencies = formatCurrencies(country.currencies) || '—';

      return `<tr>
  <td>${flagCell}</td>
  <td>${escapeHtml(country.name)}</td>
  <td>${capital}</td>
  <td class="num">${escapeHtml(country.population.toLocaleString('en-US'))}</td>
  <td>${languages === '—' ? '<span class="empty">—</span>' : escapeHtml(languages)}</td>
  <td>${currencies === '—' ? '<span class="empty">—</span>' : escapeHtml(currencies)}</td>
</tr>`;
    })
    .join('\n');

  return `<div class="table-wrap">
<table>
  <thead>
    <tr>
      <th>Flag</th>
      <th>Name</th>
      <th>Capital</th>
      <th>Population</th>
      <th>Languages</th>
      <th>Currencies</th>
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

  return template
    .replace('{{STYLES}}', styles)
    .replace('{{TABLE}}', buildTable(countries));
}

// AI-generated
export async function writeHtml(countries, outputDir) {
  const html = generateHtml(countries);
  const outPath = path.join(outputDir, 'countries.html');

  await fs.promises.mkdir(outputDir, { recursive: true });
  await fs.promises.writeFile(outPath, html, 'utf8');

  return outPath;
}
