import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import galleryMarkup from '../templates/filmsInGallery.hbs';
import { updateMoviesData } from './update-movies-data';
import { setPagination } from './pagination';
import Notiflix from 'notiflix';

const itemsApiService = new ItemsApiService();

let filmToFind = '';
const refs = getRefs();

// получаем значение из инпута
function onSearchFormInput() {
 filmToFind = refs.searchForm.value.trim();
    
  }

// фетч фильмов по названию
async function onSearchBtnClick(e) {
  e.preventDefault();
  itemsApiService.query = filmToFind;
   
  
    
  if (filmToFind) {
    Notiflix.Loading.circle('Please wait ...');
    const result = await itemsApiService.fetchItemsFromSearch();
    Notiflix.Loading.remove();
    updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
    refs.alert.innerHTML = "";
    const numberOfPages = result.total_pages;
    // console.log(numberOfPages);
    
    setPagination(numberOfPages);

     if (result.total_pages === 0) {
      refs.alert.innerHTML='Search result is not successful. Enter the correct movie name and try again.'; 
       
  }
  }

  
}

export { onSearchFormInput, onSearchBtnClick };
