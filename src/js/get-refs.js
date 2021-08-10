
function getRefs() {
    return {
        searchBtn: document.querySelector('.search__button'),
        searchForm: document.querySelector('#search'),
        moviesList: document.querySelector('.movie-list'),
        homeBtn: document.querySelector('.header__btn--home'),
        modalMovie: document.querySelector('.modal-movie'),
        main: document.querySelector('.main')
    }
}

export { getRefs }