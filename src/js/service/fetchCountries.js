import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class CountriesApiService {
  constructor() {
    this.name = '';
  }

  fetchCountries(name) {
 
    return fetch(
      `https://restcountries.com/v3.1/name/${this.name.trim()}?fields=name,capital,population,flags,languages`
    )
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
      console.error('fetchCountries:',error)
      });
  }

  get query() {
    return this.name;
  }

  set query(newQuery) {
    this.name = newQuery;
  }
}
