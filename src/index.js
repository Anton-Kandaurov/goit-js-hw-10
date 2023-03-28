import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
import { fetchCountries } from './fetchCountries';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const itemEl = document.querySelector('.country-info');

Notify.init({
  width: '300px',
  position: 'right-top',
  fontSize: '16px',
  closeButton: false,
  timeout: 3000,
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade',
  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
  info: {
    background: '#26c0d3',
    textColor: '#fff',
    childClassName: 'notiflix-notify-info',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-info-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(38,192,211,0.2)',
  },
});

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e) {
  if (e.target.value.length === 0) {
    clearAll();
    return;
  }
    
    
    
     fetchCountries(e.target.value.trim())
    .then(country => {
      if (country.length > 10) {
        onNotification('info');
        return;
      }

      if (country.length === 1) {
        renderCountryInfo(country);
        return;
      }

      renderCountriesList(country);
    })
    .catch(() => {
      onNotification('failure');
    });
}


function renderCountriesList(country) {
  clearCountriesItem();
  listEl.innerHTML = createCountriesList(country);
}

function renderCountryInfo(country) {
  clearCountriesList();
  itemEl.innerHTML = createCountryInfo(country);
}

function clearCountriesList() {
  listEl.innerHTML = '';
}

function clearCountriesItem() {
  itemEl.innerHTML = '';
}

function clearAll() {
  clearCountriesList();
  clearCountriesItem();
}

function onNotification(error) {
  clearAll();
  switch (error) {
    case 'info':
      Notify.info('Too many matches found. Please enter a more specific name.');
      break;

    case 'failure':
      Notify.failure('Oops, there is no country with that name');
      break;
  }
}

function createCountriesList(countries) {
  return countries
    .map(el => {
      return `<li class='country-item'>
    <img
      class='country-img'
      src='${el.flags.svg}'
      alt='${el.flags.alt}'
      width='40'
    />
    ${el.name.official}
  </li>`;
    })
    .join('');
}

function createCountryInfo(country) {
  return country
    .map(el => {
      return `<h2 class='country-title'>
    <img
      class='country-img-info'
      src='${el.flags.svg}'
      alt='${el.flags.alt}'
      width='40'
    />
    ${el.name.official}
  </h2>
  <ul class='country-item-list'>
    <li class='country-item-one'>Capital: 
      <span class='country-item-name'>${el.capital}</span></li>
    <li class='country-item-one'>Population: 
      <span class='country-item-name'>${el.population}</span></li>
    <li class='country-item-one'>Languages:  
        <ul class='country-lang-list'>
            ${Object.values(el.languages)
              .map(el => {
                return `<li class='country-item-lang'>${el}</li>`;
              })
              .join('')}
        </ul>
  </ul>`;
    })
    .join('');
}
