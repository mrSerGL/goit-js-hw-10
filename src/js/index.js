import '../css/styles.css';
import debounce from 'lodash.debounce';
import CountriesApiService from './service/fetchCountries';


const DEBOUNCE_DELAY = 300;

const countriesApiService = new CountriesApiService();

const refs = {
  inputField: document.querySelector('#search-box'),
};

refs.inputField.addEventListener(
    'input',
    debounce((event) => {
      getCountriesInfo(event);
    }, DEBOUNCE_DELAY)
  );

function getCountriesInfo(event) {

    countriesApiService.query = event.target.value.trim();
    // console.log(event.target.value.trim());
    
    countriesApiService.fetchCountries()
    .then(countries => console.log(countries));
   
}   
  



