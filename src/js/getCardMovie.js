'use strict'
import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import filmInModal from '../templates/filmInModal.hbs';

const itemsApiService = new ItemsApiService();
const refs = getRefs();
let modalMovieClose;

function openCardMovie(event) {
   const movieId = event.target.parentNode.dataset.id;
   if (movieId) {
      renderCard(movieId);
   }
   
};

async function renderCard(movieId) {
   await itemsApiService.fetchCard(movieId)
      .then((response) => {
         refs.modalMovie.innerHTML = filmInModal(response);
         refs.modalMovie.classList.remove(('visually-hidden'))
         modalMovieClose = document.querySelector('.modal-movie__button--close');
         modalMovieClose.addEventListener('click', closeCardMovie);
      })
};

const closeCardMovie = () => refs.modalMovie.classList.add('visually-hidden');

export { openCardMovie, renderCard };