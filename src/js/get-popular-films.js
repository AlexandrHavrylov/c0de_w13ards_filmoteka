import galleryMarkup from '../templates/filmsInGallery.hbs';
import { getRefs } from './get-refs';
import { updateMoviesData } from './update-movies-data';
import ItemsApiService from './fetch-items';

import Pagination from 'tui-pagination';
import { renderCurrentPage } from './pagination-nav';
import { options } from './pagination';

import Notiflix from 'notiflix';

const refs = getRefs();
const itemsApiService = new ItemsApiService();

async function getPopularFilms() {
  Notiflix.Loading.circle('Please wait ...');

  // Загрузка данных
  const result = await itemsApiService.fetchTrandingItems();

  Notiflix.Loading.remove();
  refs.alert.innerHTML = '';
  // Отрисовка данных
  updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));

  // ========== Создание пагинации ==========
  // Общее количество полученных страниц храним в numberOfPages
  numberOfPages = result.total_pages;

  // Пагинация
  const container = document.getElementById('pagination');
  const pagination = new Pagination(container, options, (options.totalItems = numberOfPages));

  // События при навигации
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    // console.log(currentPage);

    // Загрузка и отрисовка выбранной страницы
    renderCurrentPage(currentPage);
  });

}

export { getPopularFilms };
