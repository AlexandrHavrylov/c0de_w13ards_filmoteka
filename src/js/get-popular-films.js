
import ItemsApiService from "./fetch-items";
import galleryMarkup from '../templates/filmsInGallery.hbs'
import { getRefs } from "./get-refs";



const itemsApiService = new ItemsApiService();
const refs = getRefs()
function GetPopularFilms() {
  //фетчим популярные фильмы

  const fetchMovies = () => itemsApiService.fetchTrandingItems();
  fetchMovies().then(result => (refs.moviesList.innerHTML = galleryMarkup(result)));
}

export {GetPopularFilms}