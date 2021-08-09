import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import galleryMarkup from '../templates/filmsInGallery.hbs';
import { updateMoviesData } from './update-movies-data';
import genresTranslator from '../genres';


const itemsApiService = new ItemsApiService();

let filmToFind = ''
const refs = getRefs()



// получаем значение из инпута
 function onSearchFormInput() {
  filmToFind = refs.searchForm.value.trim()

}


// фетч фильмов по названию
async function onSearchBtnClick(e) {
  e.preventDefault()

  itemsApiService.query = filmToFind

  if (filmToFind) {


const fetchMovies = async () => {
  const result = await itemsApiService.fetchItemsFromSearch();

  const updatedMovies = result.map(movie => {
    const genres = movie.genre_ids.map(genreId => {
      const currentGenre = genresTranslator.find(singleGenre => singleGenre.id === genreId);

      return ' ' + currentGenre.name;
    });

    const movieYear = movie.release_date
    movieYear.slice(0, 4);

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
   
}

export {onSearchFormInput, onSearchBtnClick}