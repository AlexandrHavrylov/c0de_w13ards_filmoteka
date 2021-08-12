import Notiflix from "notiflix";
import userLibrary from './userLibrary';

function addToWatched(card) {  
     const InList = userLibrary.getById(card.id);
        if (!InList) {
            userLibrary.add(card);
            Notiflix.Notify.success('The movie has been added to your watched list');
        }
        else {
            Notiflix.Notify.failure("This movie is already in list")
        }    
}

function addToQueue(card) {
    const InList = userLibrary.getById(card.id);
        if (!InList) {
            userLibrary.add(card);
            Notiflix.Notify.success('The movie has been added to your queue list');
        }
        else {
            Notiflix.Notify.failure("This movie is already in list")
        }
}



export { addToWatched, addToQueue }