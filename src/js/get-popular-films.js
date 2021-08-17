import galleryMarkup from '../templates/filmsInGallery.hbs';
import { getRefs } from './get-refs';
import { updateMoviesData } from './update-movies-data';
import ItemsApiService from './fetch-items';
import Pagination from 'tui-pagination';
import { renderTrandingPage } from './pagination-nav';
import { options } from './pagination';
// import Notiflix from 'notiflix';
import notification from './pop-up-messages.js';

const refs = getRefs();
const itemsApiService = new ItemsApiService();

let numberOfPages = 0;

async function getPopularFilms() {
  // 
  notification.loadingCircle();

  // Загрузка данных
  const result = await itemsApiService.fetchTrandingItems();

  // Notiflix.Loading.remove();
  notification.loadingRemove();
  refs.alert.innerHTML = '';
  // Отрисовка данных
  updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));

  // ========== Создание пагинации ==========
  // Общее количество полученных страниц храним в numberOfPages
  numberOfPages = result.total_pages;
  // console.log(numberOfPages);

  // Пагинация
  const container = document.getElementById('pagination');
  const pagination = new Pagination(container, options, (options.totalItems = numberOfPages));

  // События при навигации
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    // console.log(currentPage);

    // Загрузка и отрисовка выбранной страницы
    renderTrandingPage(currentPage);
  });
}

export { getPopularFilms };
