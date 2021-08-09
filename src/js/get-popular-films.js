
import galleryMarkup from '../templates/filmsInGallery.hbs'
import { getRefs } from "./get-refs";
import { updateTrandingMoviesData } from "./update-movies-data";

const refs = getRefs()

function getPopularFilms() {
  updateTrandingMoviesData().then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
}

export {getPopularFilms}