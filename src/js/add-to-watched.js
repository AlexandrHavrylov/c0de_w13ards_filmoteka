import Notiflix from "notiflix";
import userLibrary from './userLibrary';

function addToWatched(card) {  
    const InList = userLibrary.getById(card.id);
    const isWatched = true;
        if (!InList) {
            userLibrary.add({...card, isWatched});
            Notiflix.Notify.success('The movie has been added to your watched list');
        }else if (!isWatched) {
         userLibrary.update({...card, isWatched});
    }
    
        else {
            Notiflix.Notify.failure("This movie is already in list")
        }    
}

function addToQueue(card) {
    const InList = userLibrary.getById(card.id);
    const isQueue = true;
        if (!InList) {
            userLibrary.add({...card, isQueue});
            Notiflix.Notify.success('The movie has been added to your queue list');
        } else if (!isQueue) {
        userLibrary.update({ ...card, isQueue });
        Notiflix.Notify.success('The movie has been added to your queue list');
    }
        else {
            Notiflix.Notify.failure("This movie is already in list")
        }
}



export { addToWatched, addToQueue }