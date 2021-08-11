import { getRefs } from './js/get-refs';
import './sass/main.scss';
import ItemsApiService from './js/fetch-items.js';
import galleryMarkup from './templates/filmsInGallery.hbs';
import { onSearchFormInput } from './js/fetch-by-name';
import { onSearchBtnClick } from './js/fetch-by-name';

import { HeaderSwitcher, HEADER_ENUM } from './js/header-switch';
import { getPopularFilms } from './js/get-popular-films';

import { UserLibrary } from './js/userLibrary';

const refs = getRefs();

refs.searchForm.addEventListener('input', onSearchFormInput);
refs.searchBtn.addEventListener('click', onSearchBtnClick);

const userLibrary = new UserLibrary();

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
