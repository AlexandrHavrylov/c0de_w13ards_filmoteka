'use strict'
import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import filmInModal from '../templates/filmInModal.hbs';
import Notiflix from "notiflix";
import { addToWatched, addToQueue } from './add-to-watched';


const itemsApiService = new ItemsApiService();
const refs = getRefs();
// let card;
      

// Открытие модального окна с готовой карточкой
function openCardMovie(event) {
   const movieId = event.target.parentNode.dataset.id;
   if (movieId) {
      renderCard(movieId)
   }  
};

async function renderCard(movieId) {
   try {
      const card = await itemsApiService.fetchCard(movieId);
      refs.modalMovie.innerHTML = filmInModal(card);
      refs.modalMovie.classList.remove(('visually-hidden'));

      const addToWatchBtn = document.querySelector("[data-name='watched']");
      const addToQueueBtn = document.querySelector("[data-name='queue']");
      const modalMovieClose = document.querySelector('[data-action="modal-close"]')
     
      // добавление слушателей после формирования карточки
      modalMovieClose.addEventListener('click', closeCard)
      addToWatchBtn.addEventListener('click', addToWatched(card));
      addToQueueBtn.addEventListener('click', addToQueue);
      window.addEventListener('keydown', closeCardEsc);
      return card;
   } catch (error) {
      Notiflix.Notify.info('Oops! Something went wrong, please try again');
      console.log(error.message)
   } 
};

// Закрытие модального окна по событию
const closeCard = () => closeCardMovie();
const closeCardEsc = event => {
   if (event.key === "Escape") {
      closeCardMovie();
   };
};

// Функция закрытия
const closeCardMovie = () => {
   refs.modalMovie.classList.add('visually-hidden');
   
   // Удаление слушателей
   window.removeEventListener('keydown', closeCardEsc);
   modalMovieClose.removeEventListener('click', closeCard)
   addToWatchBtn.removeEventListener('click', addToWatched);
   addToQueueBtn.removeEventListener('click', addToQueue);
   
};

export { openCardMovie, renderCard };