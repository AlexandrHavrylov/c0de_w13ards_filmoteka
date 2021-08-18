'use strict';
import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import filmInModal from '../templates/filmInModal.hbs';
// import Notiflix from 'notiflix';
import notification from './pop-up-messages.js';
import { addToWatched, addToQueue } from './add-to-watched';
import userLibrary from './userLibrary';
import { updateMoviesData } from './update-movies-data';
import trailerInMovie from '../templates/trailerInMovie.hbs'

const itemsApiService = new ItemsApiService();
const refs = getRefs();
let card;
let modalMovieOverlay;
let modalMovieClose;
let modalTrailer;
let trailerToWatch;

// Открытие модального окна с готовой карточкой

function openCardMovie(event) {
  const movieId = event.path[2].dataset.id;

  if (movieId) {
    renderCard(movieId);
  }
  document.querySelector('body').classList.add('scroll-disable');
};

async function renderCard(movieId) {

  try {
      //  Notiflix.Loading.circle('Please wait ...');
    notification.onLoadingCircleAdd();
    card = await itemsApiService.fetchCard(movieId);
    // костиль для коректного відображення карточки
    card.genre_ids = card.genres.map(genre => genre.id);
    // отримуємо картку з виправленими полями
    card = (await updateMoviesData({ results: [card] }))[0];

    console.log('fixedCard:', card);
    refs.modalMovie.innerHTML = filmInModal(card);
    
    //  Notiflix.Loading.remove();
    notification.onLoadingCircleRemove();
    
    refs.modalMovie.classList.remove('visually-hidden');
    const localCard = userLibrary.getById(card.id);
    if (localCard) card = { ...card, ...localCard };
    const addToWatchBtn = document.querySelector("[data-name='watched']");
    if (card.isWatched) {
      addToWatchBtn.textContent = 'Remove from watched';
    }
    const addToQueueBtn = document.querySelector("[data-name='queue']");
    if (card.isQueue) {
      addToQueueBtn.textContent = 'Remove from queue';
    }
    trailerToWatch = document.querySelector('[data-name="trailer"]');
    modalMovieOverlay = document.querySelector('.modal-movie__overlay');
    modalMovieClose = document.querySelector('[data-action="modal-close"]');
    // добавление слушателей после формирования карточки
    modalMovieClose.addEventListener('click', closeCard);
    addToWatchBtn.addEventListener('click', addToWatchBtnListener);
    addToQueueBtn.addEventListener('click', addToQueueBtnListener);
    window.addEventListener('keydown', closeCardEsc);
    modalMovieOverlay.addEventListener('click', closeCard);
    trailerToWatch.addEventListener('click', openTrailer);
    return card;
  } catch (error) {
    notification.onError();
    console.log(error.message);
  }
}


function addToWatchBtnListener() {
  addToWatched(card);
}

function addToQueueBtnListener() {
  addToQueue(card);
}

const closeCard = event => {
  if (event.target === modalMovieOverlay || event.target === modalMovieClose) {
    closeCardMovie();
    
  }
};

const closeCardEsc = event => {
  if (event.key === 'Escape') {
    closeCardMovie();
  }
};

// Функция закрытия
const closeCardMovie = () => {
  refs.modalMovie.classList.add('visually-hidden');
  document.querySelector('body').classList.remove('scroll-disable');

  // Удаление слушателей
  const addToWatchBtn = document.querySelector("[data-name='watched']");
  const addToQueueBtn = document.querySelector("[data-name='queue']");

  window.removeEventListener('keydown', closeCardEsc);
  modalMovieClose.removeEventListener('click', closeCard);
  addToWatchBtn.removeEventListener('click', addToWatchBtnListener);
  addToQueueBtn.removeEventListener('click', addToQueueBtnListener);
};

// Добавление трейлера в модальное окно

// Открытие модального окна с трейлером
function openTrailer(event) {
  const imdbId = event.target.dataset.id;
  renderTrailer(imdbId);
  modalMovieOverlay.removeEventListener('click', closeCard);
  window.removeEventListener('keydown', closeCardEsc);
};

// Закрытие окна с трейлером

const closeTrailer = (event) => {
  modalMovieOverlay.addEventListener('click', closeCard);
  modalMovieClose.addEventListener('click', closeCard);
  window.addEventListener('keydown', closeCardEsc);
  modalTrailer.classList.add('visually-hidden');
  
  modalMovieOverlay.removeEventListener('click', closeTrailer);
  modalMovieClose.removeEventListener('click', closeTrailer);
  window.removeEventListener('keydown', closeTrailerEsc);
 
};

const closeTrailerEsc = event => {
   if (event.key === "Escape") {
      closeTrailer();
   };
};

// Содание карточки с трейлером

async function renderTrailer(imdbId) {
try {
  const cardImdb = await itemsApiService.fetchTrailer(imdbId);
  modalTrailer = document.querySelector('.modal-trailer');
  modalTrailer.innerHTML = trailerInMovie(cardImdb);
  modalTrailer.classList.remove(('visually-hidden'));
  modalMovieOverlay.addEventListener('click', closeTrailer);
  modalMovieClose.addEventListener('click', closeTrailer);
  window.addEventListener('keydown', closeTrailerEsc);
  modalMovieClose.removeEventListener('click', closeCard);
   modalMovieOverlay.removeEventListener('click', closeCard);
   window.removeEventListener('keydown', closeCardEsc);
  
} catch (error){
      console.log(error.message);
  };
};
export { openCardMovie, renderCard,  openTrailer, renderTrailer};
