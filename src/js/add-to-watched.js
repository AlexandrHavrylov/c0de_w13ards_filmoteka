import Notiflix from "notiflix";
import userLibrary from './userLibrary';

function addToWatched(card) {  
    const inList = userLibrary.getById(card.id);
    if (!inList) {
        userLibrary.add(card);
        card.isWatched = true;
        userLibrary.update(card);
        Notiflix.Notify.success('The movie has been added to your watched list');
    } else if (inList&&card.isQueue) {
        card.isWatched = true;
        userLibrary.update(card);
        console.log(card)
        userLibrary.getWatchedCards();
        Notiflix.Notify.success('Added to watched list');
    } else if (inList && !card.isQueue) {
        userLibrary.remove(card);
        Notiflix.Notify.failure('The movie has been deleted from watched list');
    }
}

function addToQueue(card) {
    const inList = userLibrary.getById(card.id);
    if (!inList) {
        userLibrary.add(card);
        card.isQueue = true;
        userLibrary.update(card);
        Notiflix.Notify.success('The movie has been added to your queue list');
    } else if (inList&&card.isWatched) {
        card.isQueue = true;
        userLibrary.update(card);
        Notiflix.Notify.success('Added to queue list');
    } else if (inList&&!card.isWatched) {
        card.isQueue = false;
        userLibrary.remove(card);
        Notiflix.Notify.failure('The movie has been deleted from queue list');
        console.log(card)
    }
}

export { addToWatched, addToQueue }