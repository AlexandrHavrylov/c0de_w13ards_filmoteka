'use strict'
import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import filmInModal from '../templates/filmInModal.hbs';
import Notiflix from "notiflix";
import addToWatched from './add-to-watched';


const itemsApiService = new ItemsApiService();
const refs = getRefs();
let modalMovieClose;
let card;

// Открытие модального окна с готовой карточкой
function openCardMovie(event) {
   const movieId = event.target.parentNode.dataset.id;
   if (movieId) {
      renderCard(movieId);
   }  
};

// Отправка запроса и формирование карточки
// async function renderCard(movieId) {
//    await itemsApiService.fetchCard(movieId)
//       .then((response) => {
//          console.log(response);
//          refs.modalMovie.innerHTML = filmInModal(response);
//          refs.modalMovie.classList.remove(('visually-hidden'))
//          modalMovieClose = document.querySelector('.modal-movie__close-btn');
//          return response;
//       }).then(response => {
//            const addBtn = document.querySelector('[data-name="watched"]');
//          addBtn.addEventListener('click', () => {
//          const InList = localStorage.getItem(response.id);         
//          if (!InList) {
//             localStorage.setItem(`${response.id}`, JSON.stringify(response));
//             Notiflix.Notify.success('The movie has been added to your list');
//          }
//          else { Notiflix.Notify.failure("This movie is already in list") }});
//       })
   
   // добавление слушателей после формирования карточки

//       modalMovieClose.addEventListener('click', closeCard);
//       window.addEventListener('keydown', closeCardEsc);
// };
async function renderCard(movieId) {
   try {
      const card = await itemsApiService.fetchCard(movieId);
      refs.modalMovie.innerHTML = filmInModal(card);
      refs.modalMovie.classList.remove(('visually-hidden'))
      const addToWatch = document.querySelector("[data-name='watched']")
      const addToQeue = document.querySelector("[data-name='queue']")
      // добавление слушателей после формирования карточки
      addToWatch.addEventListener('click', addToWatched);
      addToQeue.addEventListener('click', addToWatched);
      window.addEventListener('keydown', closeCardEsc);
   } catch (error) {
      Notiflix.Notify.Info('Oops! Something went wrong, please try again');
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
   modalMovieClose.removeEventListener('click', closeCard);
   window.removeEventListener('keydown', closeCardEsc);
   // addBtn.removeEventListener('click', addToWatched)
};

export { openCardMovie, renderCard };