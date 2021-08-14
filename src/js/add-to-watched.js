import Notiflix from "notiflix";
import userLibrary from './userLibrary';

function addToWatched(card) {
         const addToWatchBtn = document.querySelector("[data-name='watched']");
   
    const inList = userLibrary.getById(card.id);
    if (!inList || !inList.isWatched) {
        card.isWatched = true;
        userLibrary.processCard(card);
        Notiflix.Notify.success('The movie has been added to your watched list');
          addToWatchBtn.textContent = 'Remove from watched' 
    } else {
        card.isWatched = false;
         userLibrary.processCard(card);
        Notiflix.Notify.failure('The movie has been deleted from watched list');
        userLibrary.showFiltered();
        addToWatchBtn.textContent = 'add to watch' 
    }
}

function addToQueue(card) {

     const addToQueueBtn = document.querySelector("[data-name='queue']");
     

    const inList = userLibrary.getById(card.id);
    if (!inList || !inList.isQueue) {
        card.isQueue = true;
        userLibrary.processCard(card);
        Notiflix.Notify.success('The movie has been added to your queue list');
         addToQueueBtn.textContent = 'Remove from queue'
    } else {
        card.isQueue = false;
        userLibrary.processCard(card);
        Notiflix.Notify.failure('The movie has been deleted from queue list');
        userLibrary.showFiltered();
         addToQueueBtn.textContent = 'Add to queue'
    }
}

export { addToWatched, addToQueue }