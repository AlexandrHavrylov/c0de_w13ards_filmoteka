import { getRefs } from './js/get-refs';
import './sass/main.scss';
import ItemsApiService from './js/fetch-items.js';
import galleryMarkup from './templates/filmsInGallery.hbs';
import { onSearchFormInput } from './js/fetch-by-name';

import { onSerchBtnClick } from './js/fetch-by-name';
import { onHomeBtnClick } from './js/on-home-btn';
import genresTranslator from './genres';
=======
import { onSearchBtnClick } from './js/fetch-by-name';
import { GetPopularFilms } from './js/get-popular-films';
import { HeaderSwitcher, HEADER_ENUM } from './js/header-switch';


const itemsApiService = new ItemsApiService();

const refs = getRefs();

=======

refs.searchForm.addEventListener('input', onSearchFormInput);
refs.searchBtn.addEventListener('click', onSearchBtnClick);




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

refs.searchForm.addEventListener('input', onSearchFormInput);
refs.searchBtn.addEventListener('click', onSerchBtnClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);
=======
const headerSwitcher = new HeaderSwitcher({
  onChangeCallback: page => {
    switch (page) {
      case HEADER_ENUM.HOME:
        refs.searchForm.value = ''
        GetPopularFilms();
        break;
      case HEADER_ENUM.LIBRARY:
        GetLibraryFilms();
        break;
    }
  },
});


function GetLibraryFilms() {}
