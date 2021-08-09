
import ItemsApiService from "./fetch-items";
import galleryMarkup from '../templates/filmsInGallery.hbs'
import { getRefs } from "./get-refs";
import genresTranslator from '../genres';


const itemsApiService = new ItemsApiService();
const refs = getRefs()
function GetPopularFilms() {
const fetchMovies = async () => {
  const result = await itemsApiService.fetchTrandingItems();

  const updatedMovies = result.map(movie => {
    const genres = movie.genre_ids.map(genreId => {
      const currentGenre = genresTranslator.find(singleGenre => singleGenre.id === genreId);

      return ' ' + currentGenre.name;
    });

    const movieYear = movie.release_date.slice(0, 4);

    if (genres.length > 3) {
      const cutGenres = genres.slice(0, 2);

      const modifiedGenre = [...cutGenres, ' Other'];

      return {
        ...movie,
        genres: modifiedGenre,
        movieYear,
      };
    }

    return {
      ...movie,
      genres,
      movieYear,
    };
  });

  return updatedMovies;
};
fetchMovies().then(movies => (refs.moviesList.innerHTML = galleryMarkup(movies)));
}

export {GetPopularFilms}