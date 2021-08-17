import { getRefs } from './js/get-refs';
import './sass/main.scss';
import ItemsApiService from './js/fetch-items.js';
import galleryMarkup from './templates/filmsInGallery.hbs';
import { onSearchFormInput } from './js/fetch-by-name';
import { onSearchBtnClick } from './js/fetch-by-name';
import { HeaderSwitcher, HEADER_ENUM } from './js/header-switch';
import { getPopularFilms } from './js/get-popular-films';
import '../node_modules/tui-pagination/dist/tui-pagination.css';
import userLibrary from './js/userLibrary';
import './js/team-modal';

import { openCardMovie } from './js/getCardMovie';
const itemsApiService = new ItemsApiService();

const refs = getRefs();

refs.searchForm.addEventListener('input', onSearchFormInput);
refs.searchBtn.addEventListener('click', onSearchBtnClick);
refs.moviesList.addEventListener('click', openCardMovie);

const headerSwitcher = new HeaderSwitcher({
  onChangeCallback: page => {
    switch (page) {
      case HEADER_ENUM.HOME:
        refs.searchForm.value = '';
        getPopularFilms();

        break;
      case HEADER_ENUM.LIBRARY:
        getLibraryFilms();
        break;
    }
  },
});

function getLibraryFilms() {
  userLibrary.showFiltered();
}
