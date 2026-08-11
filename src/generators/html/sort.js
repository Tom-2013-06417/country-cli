// AI-generated — click column headers to sort (toggles asc/desc)
(function () {
  const table = document.getElementById('countries-table');
  if (!table) return;

  const tbody = table.querySelector('tbody');
  const headers = Array.from(table.querySelectorAll('thead th.sortable'));
  if (!tbody || headers.length === 0) return;

  let activeKey = null;
  let direction = 1;

  function compare(a, b, key, type) {
    const left = a.dataset[key] ?? '';
    const right = b.dataset[key] ?? '';

    if (type === 'number') {
      return (Number(left) - Number(right)) * direction;
    }

    return (
      left.localeCompare(right, 'en', { sensitivity: 'base' }) * direction
    );
  }

  function updateHeaderState(activeHeader) {
    for (const header of headers) {
      if (header === activeHeader) {
        header.setAttribute(
          'aria-sort',
          direction === 1 ? 'ascending' : 'descending',
        );
        header.dataset.direction = direction === 1 ? 'asc' : 'desc';
      } else {
        header.removeAttribute('aria-sort');
        delete header.dataset.direction;
      }
    }
  }

  function sortBy(header) {
    const key = header.dataset.sort;
    const type = header.dataset.type || 'string';
    if (!key) return;

    if (activeKey === key) {
      direction *= -1;
    } else {
      activeKey = key;
      direction = 1;
    }

    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((a, b) => compare(a, b, key, type));
    for (const row of rows) {
      tbody.appendChild(row);
    }

    updateHeaderState(header);
  }

  for (const header of headers) {
    header.tabIndex = 0;
    header.addEventListener('click', () => sortBy(header));
    header.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        sortBy(header);
      }
    });
  }
})();
