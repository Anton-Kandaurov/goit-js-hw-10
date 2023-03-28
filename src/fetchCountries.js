const BASE_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(request => {
    if (request.ok) {
      return request.json();
    }
    throw new Error(request.status);
  });
}