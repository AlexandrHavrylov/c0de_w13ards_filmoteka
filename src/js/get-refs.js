
function getRefs() {
    return {
        searchBtn: document.querySelector('.search__button'),
        searchForm: document.querySelector('#search'),
        moviesList: document.querySelector('.movie-list'),
        homeBtn: document.querySelector('.header__btn--home'),
        modalMovie: document.querySelector('.modal-movie__container'),
        alert: document.querySelector('.alert')
    }
}

export { getRefs }