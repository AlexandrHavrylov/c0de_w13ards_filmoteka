import { getRefs } from './js/get-refs';
import './sass/main.scss';
import ItemsApiService from './js/fetch-items.js';
import galleryMarkup from './templates/filmsInGallery.hbs';
import { onSearchFormInput } from './js/fetch-by-name';
import { onSearchBtnClick } from './js/fetch-by-name';
import { GetPopularFilms } from './js/get-popular-films';
import { HeaderSwitcher, HEADER_ENUM } from './js/header-switch';
import { UserLibrary } from './js/userLibrary';
import { openCardMovie } from './js/getCardMovie';
const itemsApiService = new ItemsApiService();
const userLibrary = new UserLibrary();
const refs = getRefs();

refs.searchForm.addEventListener('input', onSearchFormInput);
refs.searchBtn.addEventListener('click', onSearchBtnClick);
refs.moviesList.addEventListener('click', openCardMovie)

const headerSwitcher = new HeaderSwitcher({
  onChangeCallback: page => {
    switch (page) {
      case HEADER_ENUM.HOME:
        refs.searchForm.value = '';
        GetPopularFilms();
        break;
      case HEADER_ENUM.LIBRARY:
        GetLibraryFilms();
        break;
    }
  },
});

function GetLibraryFilms() {
  userLibrary.showFiltered();
}
