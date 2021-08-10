
import galleryMarkup from '../templates/filmsInGallery.hbs'
import { getRefs } from "./get-refs";
import { updateMoviesData } from "./update-movies-data";
import ItemsApiService from "./fetch-items";
const itemsApiService = new ItemsApiService();

const refs = getRefs()

async function getPopularFilms() {
  const result = await itemsApiService.fetchTrandingItems()
  updateMoviesData(result).then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
}

export {getPopularFilms}