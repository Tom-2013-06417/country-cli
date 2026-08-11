// AI-generated — client-side country name filter (substring match)
(function () {
  const input = document.getElementById('country-search');
  const status = document.getElementById('search-status');
  const table = document.getElementById('countries-table');

  if (!input || !status || !table) return;

  const rows = Array.from(table.querySelectorAll('tbody tr'));

  function applyFilter() {
    const query = input.value.trim().toLowerCase();
    let visible = 0;

    for (const row of rows) {
      const nameCell = row.querySelector('.country-name');
      const name = (nameCell?.textContent || '').trim().toLowerCase();
      const matches = query === '' || name.includes(query);
      row.hidden = !matches;
      if (matches) visible += 1;
    }

    if (query === '') {
      status.textContent = '';
      return;
    }

    status.textContent =
      visible === 0
        ? 'No countries match your search.'
        : `${visible} countr${visible === 1 ? 'y' : 'ies'} match.`;
  }

  input.addEventListener('input', applyFilter);
})();
