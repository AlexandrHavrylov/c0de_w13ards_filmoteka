'use strict'
import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import filmInModal from '../templates/filmInModal.hbs';


const itemsApiService = new ItemsApiService();
const refs = getRefs();
let modalMovieClose;

// Открытие модального окна с готовой карточкой
function openCardMovie(event) {
   const movieId = event.target.parentNode.dataset.id;
   if (movieId) {
      renderCard(movieId);
   }
   
};

// Отправка запроса и формирование карточки
async function renderCard(movieId) {
   await itemsApiService.fetchCard(movieId)
      .then((response) => {
         console.log(response);
         refs.modalMovie.innerHTML = filmInModal(response);
         refs.modalMovie.classList.remove(('visually-hidden'))
         modalMovieClose = document.querySelector('.modal-movie__close-btn');
      })
   // добавление слушателей после формирования карточки
         modalMovieClose.addEventListener('click', closeCard);
         window.addEventListener('keydown', closeCardEsc);
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
   modalMovieClose.removeEventListener('click', closeCard);
   window.removeEventListener('keydown', closeCardEsc);
};

export { openCardMovie, renderCard };