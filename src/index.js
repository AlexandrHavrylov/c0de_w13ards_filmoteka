import '../node_modules/tui-pagination/dist/tui-pagination.css';
import './sass/main.scss';
import globalVariables from './js/global-variables';
import { getRefs } from './js/get-refs';
import { onSearchFormInput } from './js/fetch-by-name';
import { onSearchBtnClick } from './js/fetch-by-name';
import { HeaderSwitcher, HEADER_ENUM } from './js/header-switch';
import { getPopularFilms } from './js/get-popular-films';
import { onSortChange } from './js/sort-by-value';
import userLibrary from './js/userLibrary';
import './js/team-modal';
import './js/pagination-nav';
import { openCardMovie } from './js/getCardMovie';

import { scrollToTopBtn } from './js/back-to-top';


const refs = getRefs();

refs.searchForm.addEventListener('input', onSearchFormInput);
refs.searchBtn.addEventListener('click', onSearchBtnClick);
refs.moviesList.addEventListener('click', openCardMovie);

// Добавление стрелки back-to-top на старницу
scrollToTopBtn();

const headerSwitcher = new HeaderSwitcher({
  onChangeCallback: page => {
    globalVariables.curPage = page;

    switch (page) {
      case HEADER_ENUM.HOME:
        refs.pagination.hidden = false;
        refs.searchForm.value = '';
        refs.filterContainer.classList.remove('is-hidden');
        getPopularFilms();
        refs.sort.addEventListener('change', onSortChange);

        break;
      case HEADER_ENUM.LIBRARY:
        getLibraryFilms();
        refs.filterContainer.classList.add('is-hidden');
        break;
    }
  },
});

function getLibraryFilms() {
  userLibrary.switchToCurrentLibrary();
}
