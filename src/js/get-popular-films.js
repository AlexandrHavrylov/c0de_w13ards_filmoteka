import galleryMarkup from '../templates/filmsInGallery.hbs';
import { getRefs } from './get-refs';
import { updateMoviesData } from './update-movies-data';
import ItemsApiService from './fetch-items';
const itemsApiService = new ItemsApiService();
import { setPagination } from './pagination';
import Notiflix from 'notiflix';

const refs = getRefs();
// Notiflix.Loading.remove(0);
async function getPopularFilms() {
  const result = await itemsApiService.fetchTrandingItems();
  Notiflix.Loading.circle('Please wait ...');    
  Notiflix.Loading.remove(250);
  document.querySelector('.alert').innerHTML=''; 
  // создание пагинации
  const numberOfPages = result.total_pages;
  console.log(numberOfPages);
  setPagination(numberOfPages);

  updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
}

export { getPopularFilms };
