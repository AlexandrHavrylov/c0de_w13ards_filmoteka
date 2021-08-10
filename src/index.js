import { getRefs } from './js/get-refs';
import './sass/main.scss';
import ItemsApiService from './js/fetch-items.js';
import galleryMarkup from './templates/filmsInGallery.hbs';
import { onSearchFormInput } from './js/fetch-by-name';
import { onSerchBtnClick } from './js/fetch-by-name';
import { onHomeBtnClick } from './js/on-home-btn';
import { openCardMovie } from './js/getCardMovie';


const itemsApiService = new ItemsApiService();

const refs = getRefs()

//фетчим популярные фильмы

const fetchMovies = () => itemsApiService.fetchTrandingItems();
fetchMovies().then(result => (refs.moviesList.innerHTML = galleryMarkup(result)));

refs.searchForm.addEventListener('input', onSearchFormInput)
refs.searchBtn.addEventListener('click', onSerchBtnClick)
refs.homeBtn.addEventListener('click', onHomeBtnClick)
refs.moviesList.addEventListener('click', openCardMovie)