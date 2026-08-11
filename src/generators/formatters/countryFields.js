export function formatLanguages(languages) {
  return Object.values(languages ?? {})
    .filter(Boolean)
    .join(', ');
}

export function formatCurrencies(currencies) {
  const firstCurrency = Object.values(currencies ?? {})[0];
  if (!firstCurrency?.name) return '';

  return `${firstCurrency.name} (${firstCurrency.symbol || '—'})`;
}
