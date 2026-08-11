export function transformCountry(country) {
  const name = country.names?.common;
  const population = country.population;

  if (!name || typeof name !== 'string') {
    throw new Error('Country name is required');
  }

  if (typeof population !== 'number' || Number.isNaN(population)) {
    throw new Error(`Country population is required (${name})`);
  }

  // AI-generated (field mapping guided by v5 response shape)
  return {
    name,
    capital: country.capitals?.[0]?.name ?? null,
    population,
    languages: Object.fromEntries(
      (country.languages ?? []).map((language) => [
        language.iso639_3 ?? language.name,
        language.name ?? null,
      ]),
    ),
    currencies: Object.fromEntries(
      (country.currencies ?? []).map((currency) => [
        currency.code,
        {
          name: currency.name ?? null,
          symbol: currency.symbol ?? null,
        },
      ]),
    ),
    flag: country.flag?.url_svg ?? country.flag?.url_png ?? null,
  };
}

export function transformCountries(apiResponse) {
  const countries = Array.isArray(apiResponse)
    ? apiResponse
    : (apiResponse?.data?.objects ?? []);

  return countries
    .map(transformCountry)
    // AI-generated
    .sort((a, b) => a.name.localeCompare(b.name));
}
