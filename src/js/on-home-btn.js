import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import galleryMarkup from '../templates/filmsInGallery.hbs';
const itemsApiService = new ItemsApiService();

const refs = getRefs()

function onHomeBtnClick(e) {
    e.preventDefault()

   refs.searchForm.value = ''

    const fetchMovies = () => itemsApiService.fetchTrandingItems();
    fetchMovies().then(result => (refs.moviesList.innerHTML = galleryMarkup(result)));
}

export {onHomeBtnClick}