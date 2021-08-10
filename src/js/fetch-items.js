import axios from 'axios';

export default class ItemsApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchTrandingItems() {
    const BASE_URL = 'https://api.themoviedb.org';
    const URL_TRANDING_ITEMS = '/3/trending/movie/day';
    const API_KEY = '5fa4bb8a58c85ac583b1447954dde7e6';

    const url = `${BASE_URL}${URL_TRANDING_ITEMS}?api_key=${API_KEY}`;

    return axios
      .get(url)
      .then(response => {
        this.incrementPage();
        return response.data.results;
      })
      .catch(error => console.log(error.message));
  }

  fetchItemsFromSearch() {
    const BASE_URL = 'https://api.themoviedb.org';
    const URL_SEARCHED_ITEMS = '/3/search/movie';
    const API_KEY = '5fa4bb8a58c85ac583b1447954dde7e6';

    const url = `${BASE_URL}${URL_SEARCHED_ITEMS}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${this.searchQuery}`;

    return axios
      .get(url)
      .then(response => {
        this.incrementPage();
        return response.data.results;
      })
      .catch(error => console.log(error.message));
  }
  
  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
