import Notiflix from "notiflix";

export default function addToWatched(data) {
    function qwe(data) {
        const InList = localStorage.getItem(data.id);
        console.log(InList)
        if (!InList) {
            localStorage.setItem('qwe', JSON.stringify(data));
            Notiflix.Notify.success('The movie has been added to your list');
        }
        else { Notiflix.Notify.failure("This movie is already in list") };
    }

         const addBtn = document.querySelector('[data-name="watched"]');
addBtn.addEventListener('click', qwe);
}

