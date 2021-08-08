export const HEADER_ENUM = {
  HOME: 'home',
  LIBRARY: 'library',
};

const CLASSLIST_ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
};

const defaultOptions = {
  currentHeader: HEADER_ENUM.HOME, // поточна сторінка
  hideClassCss: 'is-hidden', // клас для приховування елементів
  header: '.js-header', // класс з хедером
  searchContainer: '.js-search', // контейнер з пошуком
  libraryContainer: '.js-library', // контейнер з кнопками "Watched" і "Queue"
  buttons: {
    home: '.js-btn-home', // клас кнопки "Home"
    library: '.js-btn-library', // клас кнопки "Library"
  },
  headerImagesStyle: {
    home: 'header-home', // стилі для хедер Home
    library: 'header-library', // стиля для хедер Library
  },
};

export class HeaderSwitcher {
  constructor(arg) {
    const options = { ...defaultOptions, ...arg };
    console.log(options);
    this.currentHeader = options.currentHeader;
    this.hideClassCss = options.hideClassCss;
    this.headerImagesStyle = options.headerImagesStyle;

    this.refs = {
      headerEl: document.querySelector(options.header),
      searchEl: document.querySelector(options.searchContainer),
      libraryEl: document.querySelector(options.libraryContainer),
      btnHomeEl: document.querySelector(options.buttons.home),
      btnLibraryEl: document.querySelector(options.buttons.library),
    };

    this.refs.btnHomeEl.addEventListener('click', () => this.switchTo(HEADER_ENUM.HOME));
    this.refs.btnLibraryEl.addEventListener('click', () => this.switchTo(HEADER_ENUM.LIBRARY));

    this.switchTo(this.currentHeader);
  }

  switchTo(headerEnum) {
    this.currentHeader = headerEnum;
    switch (headerEnum) {
      case HEADER_ENUM.HOME:
        this.#applyClasses(CLASSLIST_ACTION.REMOVE, CLASSLIST_ACTION.ADD);

        break;

      case HEADER_ENUM.LIBRARY:
        this.#applyClasses(CLASSLIST_ACTION.ADD, CLASSLIST_ACTION.REMOVE);
    }
  }

  #applyClasses(classListAction1, classListAction2) {
    this.refs.searchEl.classList[classListAction1](this.hideClassCss);
    this.refs.headerEl[classListAction1](this.headerImagesStyle.library);

    this.refs.libraryEl.classList[classListAction2](this.hideClassCss);
    this.refs.headerEl[classListAction2](this.headerImagesStyle.home);
  }
}
