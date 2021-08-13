import galleryMarkup from '../templates/filmsInGallery.hbs';
import { getRefs } from './get-refs';
import { updateMoviesData } from './update-movies-data';
import ItemsApiService from './fetch-items';
const itemsApiService = new ItemsApiService();
import { setPagination } from './pagination';
import Notiflix from 'notiflix';

const refs = getRefs();

async function getPopularFilms() {
  Notiflix.Loading.circle('Please wait ...');    
  const result = await itemsApiService.fetchTrandingItems();
  Notiflix.Loading.remove();
  
  refs.alert.innerHTML= ""; 
  // создание пагинации
  const numberOfPages = result.total_pages;
  console.log(numberOfPages);
  setPagination(numberOfPages);

  updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
}

export { getPopularFilms };
