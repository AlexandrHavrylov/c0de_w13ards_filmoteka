'use strict';
import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import filmInModal from '../templates/filmInModal.hbs';
import Notiflix from 'notiflix';
import { addToWatched, addToQueue } from './add-to-watched';
import userLibrary from './userLibrary';
import { updateMoviesData } from './update-movies-data';

const itemsApiService = new ItemsApiService();
const refs = getRefs();
let card;
let modalMovieOverlay;
let modalMovieClose;

// Открытие модального окна с готовой карточкой

function openCardMovie(event) {
  const movieId = event.path[2].dataset.id;
  console.log(movieId);

  if (movieId) {
    renderCard(movieId);
  }
  document.querySelector('body').classList.add('scroll-disable');
}

async function renderCard(movieId) {

  try {
       Notiflix.Loading.circle('Please wait ...');
    card = await itemsApiService.fetchCard(movieId);
    // костиль для коректного відображення карточки
    card.genre_ids = card.genres.map(genre => genre.id);
    // отримуємо картку з виправленими полями
    card = (await updateMoviesData({ results: [card] }))[0];

    console.log('fixedCard:', card);
    refs.modalMovie.innerHTML = filmInModal(card);
    
     Notiflix.Loading.remove();
    
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
    modalMovieClose = document.querySelector('[data-action="modal-close"]');
    modalMovieOverlay = document.querySelector('.modal-movie__overlay');

    // добавление слушателей после формирования карточки
    modalMovieClose.addEventListener('click', closeCard);
    addToWatchBtn.addEventListener('click', addToWatchBtnListener);
    addToQueueBtn.addEventListener('click', addToQueueBtnListener);
    window.addEventListener('keydown', closeCardEsc);
    modalMovieOverlay.addEventListener('click', closeCard);
    return card;
  } catch (error) {
    Notiflix.Notify.info('Oops! Something went wrong, please try again');
    console.log(error.message);
  }
}


function addToWatchBtnListener() {
  addToWatched(card);
}

function addToQueueBtnListener() {
  addToQueue(card);
}

// Закрытие модального окна по событию
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
  const modalMovieClose = document.querySelector('[data-action="modal-close"]');
  const addToWatchBtn = document.querySelector("[data-name='watched']");
  const addToQueueBtn = document.querySelector("[data-name='queue']");

  window.removeEventListener('keydown', closeCardEsc);
  modalMovieClose.removeEventListener('click', closeCard);
  addToWatchBtn.removeEventListener('click', addToWatchBtnListener);
  addToQueueBtn.removeEventListener('click', addToQueueBtnListener);
};

export { openCardMovie, renderCard };
