import galleryMarkup from '../templates/filmsInGallery.hbs';
import { getRefs } from './get-refs';
import { updateMoviesData } from './update-movies-data';
import ItemsApiService from './fetch-items';
import { setPagination } from './pagination';
import Notiflix from 'notiflix';

const refs = getRefs();
const itemsApiService = new ItemsApiService();

async function getPopularFilms() {
  Notiflix.Loading.circle('Please wait ...');
  const result = await itemsApiService.fetchTrandingItems();
  Notiflix.Loading.remove();

  refs.alert.innerHTML = '';
  // создание пагинации
  const numberOfPages = result.total_pages;

  setPagination(numberOfPages);

  updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
}

export { getPopularFilms };
