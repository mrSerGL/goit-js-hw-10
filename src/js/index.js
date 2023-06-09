import '../css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import CountriesApiService from './service/fetchCountries';

const DEBOUNCE_DELAY = 300;

const countriesApiService = new CountriesApiService();

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

refs.inputField.addEventListener(
  'input',
  debounce(event => {
    validateInput(refs.inputField.value);

    if (refs.inputField.value < 1) {
      refs.countryList.innerHTML = '';
      return;
    }
    getCountriesInfo(event);
  }, DEBOUNCE_DELAY)
);

function validateInput(inputValue) {
  const regex = /^\s/;
  if (regex.test(inputValue)) {
    refs.inputField.value = '';
  }
}

function getCountriesInfo(event) {
  countriesApiService.query = event.target.value.trim();
  countriesApiService
    .fetchCountries()
    .then(countries => {
      createMarkup(countries);

      checkReceivedData(countries);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.countryInfo.innerHTML = '';
      console.error('getCountriesInfo:', error);
    });
}

function checkReceivedData(countries) {
  const foundCountries = Number(countries.length);

  refs.countryInfo.innerHTML = '';

  if (countries.status === 404) {
    Notify.failure('Oops, there is no country with that name');
  } else if (foundCountries > 10) {
    refs.countryList.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name');
  } else if (foundCountries === 1) {
    refs.countryList.innerHTML = '';
    createCountryInfo(countries);
  }
  console.log(countries);
}

function createMarkup(countries) {
  refs.countryList.innerHTML = '';

  const markup = countries
    .map((country, index) => {
      const { flags, name } = countries[index];

      return `<li class="country__list-item">
    <img class="flag" width="25px" height="25px" src="${flags.svg}" alt="">
    <span class="name" >${name.common}</span>
    </li>`;
    })
    .join('');

  refs.countryList.innerHTML = markup;
  onCountryListItem();
}

function createCountryInfo(countries) {
  console.log(countries);
  refs.countryList.innerHTML = '';
  const { flags, name, capital, population, languages } = countries[0];

  const markup = `<img class="flag" width="35px" height="35px" src="${
    flags.svg
  }" alt="">
  <span class="name" >${name.common}</span>

   <ul>
    <li><span class="title">Capital:</span><span class="title_info">${capital}</span></li>
    <li><span class="title">Population:</span><span class="title_info">${population}</span></li>
    <li><span class="title">Languages:</span><span class="title_info">${Object.values(
      languages
    )}</span></li>
  </ul>`;

  refs.countryInfo.innerHTML = markup;
}

function onCountryListItem() {
  refs.countryList.addEventListener('click', clicks);
}

function clicks(event) {
  const countryName = event.target.textContent;

  if (countryName) {
    countriesApiService.query = countryName;

    countriesApiService
      .fetchCountries(countryName)
      .then(data => {
        createCountryInfo(data);
      })
      .catch(error => {
        console.log(error);
      });

    refs.inputField.value = '';
    refs.countryList.removeEventListener('click', clicks);
  }
}
