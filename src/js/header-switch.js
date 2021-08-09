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
  header: '.header', // класс з хедером
  searchContainer: '.header__input', // контейнер з пошуком
  libraryContainer: '.form__btn', // контейнер з кнопками "Watched" і "Queue"
  buttons: {
    home: '.header__btn--home', // клас кнопки "Home"
    library: '.header__btn--library', // клас кнопки "Library"
  },
  headerBackgroundImagesStyle: {
    home: 'header', // стилі для хедер Home
    library: 'header__lib', // стиля для хедер Library
  },
  onChangeCallback: e => console.log(e),
};

export class HeaderSwitcher {
  constructor(arg) {
    const options = { ...defaultOptions, ...arg };

    this.currentHeader = options.currentHeader;
    this.hideClassCss = options.hideClassCss;
    this.headerBackgroundImagesStyle = options.headerBackgroundImagesStyle;
    this.onChangeCallback = options.onChangeCallback;
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

  onChange() {
    this.onChangeCallback(this.currentHeader);
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

    this.onChange();
  }

  #applyClasses(classListAction1, classListAction2) {
    this.refs.searchEl.classList[classListAction1](this.hideClassCss);
    this.refs.headerEl.classList[classListAction1](this.headerBackgroundImagesStyle.library);

    this.refs.libraryEl.classList[classListAction2](this.hideClassCss);
    this.refs.headerEl.classList[classListAction2](this.headerBackgroundImagesStyle.home);
  }
}
