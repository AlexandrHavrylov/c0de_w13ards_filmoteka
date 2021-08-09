import { getRefs } from './get-refs';
import ItemsApiService from './fetch-items.js';
import galleryMarkup from '../templates/filmsInGallery.hbs';

const itemsApiService = new ItemsApiService();
const movieCard = document.querySelector('.movie-card');
const refs = getRefs()

function openCard(event) {
   const movieId = event.target.parentNode.dataset.id;
   console.log(movieId);
   fetchCard(movieId)
   .then((response) => {
         console.log(response)
         // refs.modalMovie.innerHTML = modalMarkup(response);
      })
}
// if (movieCard) {
//    movieCard.addEventListener('click', openCard)
// }
// function openCard(e) {
//    getIdMovie();
//    renderCard(movieId)
// };

// export { openCard };

// function getIdMovie() {
//    const movieId = movieCard.dataset.id
//    return movieId;
// }

// function renderCard(movieId) {
//    itemsApiService.fetchCard(movieId)
//       .then((response) => {
//          console.log(response)
//          // refs.modalMovie.innerHTML = modalMarkup(response);
//       })

   export { openCard }