import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import galleryMarkup from '../templates/filmsInGallery.hbs';
import { updateMoviesData } from './update-movies-data';
import Pagination from 'tui-pagination';
import { renderMovieToFindPage } from './pagination-nav';
import { options } from './pagination';

// import Notiflix from 'notiflix';
import notification from './pop-up-messages.js';

const itemsApiService = new ItemsApiService();

let filmToFind = '';
let numberOfPages = 0;
const refs = getRefs();

// получаем значение из инпута
function onSearchFormInput() {
  filmToFind = refs.searchForm.value.trim();
}

// фетч фильмов по названию
async function onSearchBtnClick(e) {
  e.preventDefault();
  itemsApiService.query = filmToFind;
  refs.filterContainer.classList.add('is-hidden');

  if (filmToFind) {
    // Notiflix.Loading.circle('Please wait ...');
    notification.loadingCircle();
    const result = await itemsApiService.fetchItemsFromSearch();
    // Notiflix.Loading.remove();
    notification.loadingRemove();
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
      renderMovieToFindPage(currentPage, filmToFind);
    });
    refs.alert.innerHTML = '';

    if (result.total_pages === 0) {
      refs.alert.innerHTML =
        'Search result is not successful. Enter the correct movie name and try again.';
    }
  }
}

export { onSearchFormInput, onSearchBtnClick };
