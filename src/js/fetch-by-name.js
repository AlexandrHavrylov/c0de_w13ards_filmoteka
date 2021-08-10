import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import galleryMarkup from '../templates/filmsInGallery.hbs';
import { updateMoviesData } from './update-movies-data';



const itemsApiService = new ItemsApiService();

let filmToFind = ''
const refs = getRefs()

// получаем значение из инпута
 function onSearchFormInput() {
  filmToFind = refs.searchForm.value.trim()

}

// фетч фильмов по названию
async function onSearchBtnClick(e) {
  e.preventDefault()
  itemsApiService.query = filmToFind

  if (filmToFind) {
  const result = await itemsApiService.fetchItemsFromSearch();
  updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
}
   
}

export {onSearchFormInput, onSearchBtnClick}