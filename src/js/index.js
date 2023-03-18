import '../css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import CountriesApiService from './service/fetchCountries';

const DEBOUNCE_DELAY = 300;

const countriesApiService = new CountriesApiService();

const refs = {
  inputField: document.querySelector('#search-box'),
};

refs.inputField.addEventListener(
  'input',
  debounce(event => {
    getCountriesInfo(event);
  }, DEBOUNCE_DELAY)
);

function getCountriesInfo(event) {
  countriesApiService.query = event.target.value.trim();
  countriesApiService.fetchCountries().then(countries => {
    checkReceivedData(countries);
  });
}

function checkReceivedData(countries) {
  const foundCountries = Number(countries.length);

  if (countries.status === 404) {
    Notify.failure('Oops, there is no country with that name');
  } else if (foundCountries > 10) {
    Notify.info('Too many matches found. Please enter a more specific name');
  }

  console.log(typeof countries);
  console.log(countries);
}
