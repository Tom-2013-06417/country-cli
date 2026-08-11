export function formatLanguages(languages) {
  return Object.values(languages ?? {})
    .filter(Boolean)
    .join(', ');
}

export function formatCurrencies(currencies) {
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
