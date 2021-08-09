import genresTranslator from '../genres';
import ItemsApiService from "./fetch-items";
const itemsApiService = new ItemsApiService();


async function updateTrandingMoviesData()
{
  const result = await itemsApiService.fetchTrandingItems()

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

export { updateTrandingMoviesData }