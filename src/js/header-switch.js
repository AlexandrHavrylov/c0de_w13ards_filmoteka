/*
 */

const HEADER_ENUM = {
  HOME: 'home',
  LIBRARY: 'library',
};

const CLASSLIST_ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
};

class HeaderSwitcher {
  constructor(
    options = {
      currentHeader: HEADER_ENUM.HOME,
      hideClassCss: 'is-hidden',
      header: '.js-header',
      searchContainer: '.js-search',
      libraryContainer: '.js-library',
      buttons: {
        home: '.js-btn-home',
        library: '.js-btn-library',
      },
      headerImagesStyle: { home: 'header-home', library: 'header-library' },
    },
  ) {
    this.currentHeader = options.currentHeader;
    this.hideClassCss = options.hideClassCss;
    this.headerImagesStyle = this.headerImagesStyle;

    const dqs = document.querySelector;

    this.refs = {
      headerEl: dqs(options.header),
      searchEl: dqs(options.searchContainer),
      libraryEl: dqs(options.libraryContainer),
      btnHomeEl: dqs(options.buttons.home),
      btnLibraryEl: dqs(options.buttons.library),
    };

    this.refs.btnHomeEl.addEventListener('click', e => {});
    this.refs.btnLibraryEl.addEventListener('click', e => {});
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
