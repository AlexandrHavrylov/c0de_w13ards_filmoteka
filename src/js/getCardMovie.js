import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import filmInModal from '../templates/filmInModal.hbs';

const itemsApiService = new ItemsApiService();
const refs = getRefs()

function getIdMovie(event) {
   const movieId = event.target.parentNode.dataset.id;
   console.log(movieId);
   renderCard(movieId);
}

function renderCard(movieId) {
   itemsApiService.fetchCard(movieId)
      .then((response) => {
         refs.modalMovie.innerHTML = filmInModal(response);
      })
}
   export { getIdMovie, renderCard}