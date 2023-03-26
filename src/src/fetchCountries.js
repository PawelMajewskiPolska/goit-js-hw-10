const ADDRESS_URL = 'https://restcountries.com/v3.1/name/';
const countryCriteria = 'countryData=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${ADDRESS_URL}${name}?${countryCriteria}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
