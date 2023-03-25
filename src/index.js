import './css/styles.css';
import Notiflix, { Confirm } from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
import { fetchCountries } from './fetchCountries';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(handelInputForm, DEBOUNCE_DELAY));

function handelInputForm(i) {
    const inputCuntry = i.target.value.trim();
    console.log(inputCuntry);
    fetchCountries(inputCuntry).then(makeCoutryList);
};

function makeCoutryList(data) {
    const inputList = data.map(({ flags, name }) => {
        return `<img class="flags_list" src="${flags.svg}" alt="">
        <h3>${name.common}</h3>
    `
    }).join(' ');
    console.log(inputList);
    console.log(data);
    countryList.insertAdjacentHTML('afterbegin', inputList);
};
makeCoutryList()

