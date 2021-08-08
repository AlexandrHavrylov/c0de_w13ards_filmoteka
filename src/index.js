import { moviesList } from './js/refs';

import './sass/main.scss';

// пробный код для проверки работоспособности запросов
// =======================================================

import './js/fetch-items';

import ItemsApiService from './js/fetch-items.js';

import galleryMarkup from './templates/filmsInGallery.hbs';

const itemsApiService = new ItemsApiService();

console.log(itemsApiService);

function onLoad() {
  // Не уверен для чего эта функция, пока она ничего не ретурнит.
  // Если в будущем она будет давать массив фильмов, тогда нужно убрать либо
  // эту функцию (onLoad), либо мою (fetchMovies)
  console.log(itemsApiService.fetchTrandingItems());

  // Log ниже будет работать если подставить значение в search querry
  // console.log(itemsApiService.fetchItemsFromSearch());
}

onLoad();

const fetchMovies = () => itemsApiService.fetchTrandingItems();

fetchMovies().then(result => (moviesList.innerHTML = galleryMarkup(result)));

// =======================================================
