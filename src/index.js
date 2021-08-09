import { getRefs } from './js/get-refs';
import './sass/main.scss';
import ItemsApiService from './js/fetch-items.js';
import galleryMarkup from './templates/filmsInGallery.hbs';
import { onSearchFormInput } from './js/fetch-by-name';
import { onSerchBtnClick } from './js/fetch-by-name';
import { onHomeBtnClick } from './js/on-home-btn';
import { HeaderSwitcher, HEADER_ENUM } from './js/header-switch';

const itemsApiService = new ItemsApiService();

const refs = getRefs();

refs.searchForm.addEventListener('input', onSearchFormInput);
refs.searchBtn.addEventListener('click', onSerchBtnClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);

const headerSwitcher = new HeaderSwitcher({
  onChangeCallback: page => {
    switch (page) {
      case HEADER_ENUM.HOME:
        GetPopularFilms();
        break;
      case HEADER_ENUM.LIBRARY:
        GetLibraryFilms();
        break;
    }
  },
});

function GetPopularFilms() {
  //фетчим популярные фильмы

  const fetchMovies = () => itemsApiService.fetchTrandingItems();
  fetchMovies().then(result => (refs.moviesList.innerHTML = galleryMarkup(result)));
}

function GetLibraryFilms() {}
