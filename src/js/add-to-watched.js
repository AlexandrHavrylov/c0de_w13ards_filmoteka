import Notiflix from "notiflix";
import userLibrary from './userLibrary';

function addToWatched(card) {  
    const InList = userLibrary.getById(card.id);
    if (!InList) {
        userLibrary.add(card);
        card.isWatched = true;
        userLibrary.update(card);
        Notiflix.Notify.success('The movie has been added to your watched list');
    } else if (InList) {
        card.isWatched = false;
        userLibrary.remove(card);
        userLibrary.getWatchedCards();
        Notiflix.Notify.failure('The movie has been deleted from watched list');
    }
}

function addToQueue(card) {
    const InList = userLibrary.getById(card.id);
    if (!InList) {
        userLibrary.add(card);
        card.isQueue = true;
        userLibrary.update(card);
        Notiflix.Notify.success('The movie has been added to your queue list');
    } else if (InList) {
        card.isQueue = false;
        userLibrary.remove(card);
        Notiflix.Notify.failure('The movie has been deleted from queue list');
    } else if (InList&&card.isWatched) {
        card.isQueue = true;
        userLibrary.update(card);
    }
}

export { addToWatched, addToQueue }