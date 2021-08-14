import Notiflix from "notiflix";
import userLibrary from './userLibrary';

function addToWatched(card) {  
    const inList = userLibrary.getById(card.id);
    if (!inList || !inList.isWatched) {
        card.isWatched = true;
        userLibrary.processCard(card);
        Notiflix.Notify.success('The movie has been added to your watched list');
    } else {
        card.isWatched = false;
         userLibrary.processCard(card);
        Notiflix.Notify.failure('The movie has been deleted from watched list');
        userLibrary.showFiltered();
    }
}

function addToQueue(card) {
    const inList = userLibrary.getById(card.id);
    if (!inList || !inList.isQueue) {
        card.isQueue = true;
        userLibrary.processCard(card);
        Notiflix.Notify.success('The movie has been added to your queue list');
    } else {
        card.isQueue = false;
        userLibrary.processCard(card);
        Notiflix.Notify.failure('The movie has been deleted from queue list');
        userLibrary.showFiltered();
    }
}

export { addToWatched, addToQueue }