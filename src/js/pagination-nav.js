import galleryMarkup from '../templates/filmsInGallery.hbs';
import { getRefs } from './get-refs';
import { updateMoviesData } from './update-movies-data';
import ItemsApiService from './fetch-items';

const itemsApiService = new ItemsApiService();
const refs = getRefs();

async function renderCurrentPage(page) {
  itemsApiService.page = page;

  const result = await itemsApiService.fetchTrandingItems();
  console.log(result);
  updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
}

export { renderCurrentPage };
