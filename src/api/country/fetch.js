export async function fetchCountries({ path: pathSuffix = '', query = {} } = {}) {
  const baseUrl = process.env.COUNTRIES_API_BASE_URL;
  const apiKey = process.env.COUNTRIES_API_KEY;

  if (!baseUrl) {
    throw new Error('Missing COUNTRIES_API_BASE_URL in environment');
  }
  if (!apiKey) {
    throw new Error('Missing COUNTRIES_API_KEY in environment');
  }

  // AI-generated
  const url = new URL(baseUrl);
  // Only append when provided — assigning '' would wipe /countries/v5
  if (pathSuffix) {
    url.pathname = `${url.pathname.replace(/\/$/, '')}/${pathSuffix.replace(/^\//, '')}`;
  }
  url.search = new URLSearchParams(query).toString();

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Countries API failed: ${res.status} — ${body}`);
  }

  return res.json();
}
