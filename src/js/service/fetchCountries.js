export default class CountriesApiService {
  constructor() {
    this.name = '';
  }

  fetchCountries(name) {
    // console.log('from import',this.name);
    return fetch(
      `https://restcountries.com/v3.1/name/${this.name}?fields=name,capital,population,flags,languages`
    )
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        //   alert(error);
      });
  }

  get query() {
    return this.name;
  }

  set query(newQuery) {
    this.name = newQuery;
  }
}
