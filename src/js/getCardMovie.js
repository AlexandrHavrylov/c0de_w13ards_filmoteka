'use strict'
import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import filmInModal from '../templates/filmInModal.hbs';
import Notiflix from "notiflix";
import { addToWatched, addToQueue } from './add-to-watched';
import userLibrary from './userLibrary';


const itemsApiService = new ItemsApiService();
const refs = getRefs();
let card;

// Открытие модального окна с готовой карточкой

function openCardMovie(event) {
   const movieId = event.path[2].dataset.id
   console.log(movieId)

   if (movieId) {
      renderCard(movieId);
   }
   document.querySelector('body').classList.add('scroll-disable');
   
};

async function renderCard(movieId) {
   try {
      


      card = await itemsApiService.fetchCard(movieId);
      refs.modalMovie.innerHTML = filmInModal(card);
      refs.modalMovie.classList.remove(('visually-hidden'));    
      const localCard = userLibrary.getById(card.id);
      if (localCard) card = { ...card, ...localCard };
            
      const modalMovieClose = document.querySelector('[data-action="modal-close"]');
     
      const addToWatchBtn = document.querySelector("[data-name='watched']");
      const addToQueueBtn = document.querySelector("[data-name='queue']");
      // добавление слушателей после формирования карточки
      modalMovieClose.addEventListener('click', closeCard)
      addToWatchBtn.addEventListener('click', addToWatchBtnListener);
      addToQueueBtn.addEventListener('click', addToQueueBtnListener);
      window.addEventListener('keydown', closeCardEsc);
      return card;
   } catch (error) {
      Notiflix.Notify.info('Oops! Something went wrong, please try again');
      console.log(error.message)
   } 
};

function addToWatchBtnListener() {
   addToWatched(card);
}

function addToQueueBtnListener() {
   addToQueue(card);
}


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
   document.querySelector('body').classList.remove('scroll-disable');
   
   // Удаление слушателей
   const modalMovieClose = document.querySelector('[data-action="modal-close"]');
   const addToWatchBtn = document.querySelector("[data-name='watched']");
   const addToQueueBtn = document.querySelector("[data-name='queue']");

   window.removeEventListener('keydown', closeCardEsc);
   modalMovieClose.removeEventListener('click', closeCard);
   addToWatchBtn.removeEventListener('click', addToWatchBtnListener);
   addToQueueBtn.removeEventListener('click', addToQueueBtnListener);
   
};

export { openCardMovie, renderCard };