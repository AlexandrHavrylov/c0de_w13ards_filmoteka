import galleryMarkup from '../templates/filmsInGallery.hbs';
import { getRefs } from './get-refs';
import { updateMoviesData } from './update-movies-data';
import ItemsApiService from './fetch-items';

const itemsApiService = new ItemsApiService();
const refs = getRefs();

async function renderTrandingPage(page) {
  itemsApiService.page = page;

  const result = await itemsApiService.fetchTrandingItems();
  updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
}
async function renderTopPage (page) {
  itemsApiService.page = page;

  const result = await itemsApiService.fetchTop();
  updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
}


export { renderTrandingPage, renderTopPage };