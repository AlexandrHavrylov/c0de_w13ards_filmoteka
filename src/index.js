import './sass/main.scss';

// пробный код для проверки работоспособности запросов
// =======================================================

import './js/fetch-items';

import ItemsApiService from './js/fetch-items.js';

const itemsApiService = new ItemsApiService();

// console.log(itemsApiService);

// function onLoad() {
//   console.log(itemsApiService.fetchTrandingItems());

//   // Log ниже будет работать если подставить значение в search querry
//   // console.log(itemsApiService.fetchItemsFromSearch());
// }

// onLoad();
// // =======================================================


import { getRefs } from './js/get-refs';
import { onSearchFormInput } from './js/fetch-by-name';
import { onSerchBtnClick } from './js/fetch-by-name';

const refs = getRefs()

refs.searchForm.addEventListener('input', onSearchFormInput)
refs.searchBtn.addEventListener('click', onSerchBtnClick)


