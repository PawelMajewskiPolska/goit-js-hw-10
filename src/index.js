import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './src/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('input');
const listOfCountries = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

inputCountry.addEventListener(
  'input',
  debounce(inputCountryName, DEBOUNCE_DELAY)
);

function inputCountryName() {
  const name = inputCountry.value.trim();
  if (name === '') {
    listOfCountries.innerHTML = '';
    infoCountry.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(countries => {
      listOfCountries.innerHTML = '';
      infoCountry.innerHTML = '';
      if (countries.length === 1) {
        infoCountry.insertAdjacentHTML(
          'beforeend',
          renderOneCountry(countries)
        );
      } else if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 2 && countries.length <= 10) {
        listOfCountries.style.listStyleType = 'none';
        listOfCountries.insertAdjacentHTML(
          'afterbegin',
          renderMoreCountries(countries)
        );
      } else {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });

  function renderMoreCountries(countries) {
    const markup = countries
      .map(({ name, flags }) => {
        return `
            <li style = "display:flex; align-items:center; margin-bottom: 20px; font-size: 10px">
                <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 50px height = 30px >
                <h2 style="display:inline-block; margin-left: 20px">${name.official}</h2>
            </li>
            `;
      })
      .join('');
    return markup;
  }
}

function renderOneCountry(countries) {
  const markupMore = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `<ul style = "list-style-type: none"><li>
      <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${
        name.common
      }" width = 75px >
                <h2 margin-left: 20px">${name.official}</h2>
    <p><b>Capital</b>: ${capital}</p>
    <p><b>Population</b>: ${population}</p>
    <p><b>Languages</b>: ${Object.values(languages)}</p>
  </li></ul>`;
    })
    .join('');
  return markupMore;
}
