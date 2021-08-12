import Notiflix from "notiflix";
import userLibrary from './userLibrary';

function addToWatched(card) {  
    console.log(card)
     const InList = userLibrary.getById(card.id);
     console.log(InList)
        if (!InList) {
            userLibrary.add(card);
            Notiflix.Notify.success('The movie has been added to your watched list');
        }
        else {
            Notiflix.Notify.failure("This movie is already in list")
        }    
}

function addToQueue(card) {
    console.log(card)
    const isInList = userLibrary.getById(card.id);
        if (!isInList) {
            userLibrary.add(card);
            Notiflix.Notify.success('The movie has been added to your queue list');
        }
        else {
            Notiflix.Notify.failure("This movie is already in list")
        }
}

export { addToWatched, addToQueue }