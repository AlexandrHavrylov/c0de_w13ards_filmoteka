import Notiflix from "notiflix";
import  userLibrary  from './js/userLibrary';
console.log(userLibrary);

export default function addToWatched(data) {
        const InList = localStorage.getItem(data.id);
        console.log(InList)
        if (!InList) {
            userLibrary.add();
            Notiflix.Notify.success('The movie has been added to your list');
        }
        else { Notiflix.Notify.failure("This movie is already in list") };
    }

