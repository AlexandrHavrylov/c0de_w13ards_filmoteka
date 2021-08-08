import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';

const itemsApiService = new ItemsApiService();

let filmToFind = ''
const searchForm = getRefs().searchForm


// получаем значение из инпута
 function onSearchFormInput() {
  filmToFind = searchForm.value.trim()

}


// фетч фильмов по названию
async function onSerchBtnClick(e) {
  e.preventDefault()
 itemsApiService.query = filmToFind
  if (filmToFind) {
   
    const filmFromSearch = await itemsApiService.fetchItemsFromSearch()
    console.log(filmFromSearch)
  }
}

export {onSearchFormInput, onSerchBtnClick}