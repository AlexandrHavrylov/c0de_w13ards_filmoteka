const defaultOptions = {
  isSelectedStyle: 'form__btn--current',
  buttons: {
    watched: '#watched',
    queue: '#queue',
  },
  cardContainer: '',
};

const USER_LIBRARY_ENUM = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};
this.#curLibrary = USER_LIBRARY_ENUM.WATCHED;
this.#refs = {};

const CLASSLIST_ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
};

class UserLibrary {
  constructor(args) {
    this.options = { ...defaultOptions, ...args };

    this.#refs.btnWatched = document
      .querySelector(options.buttons.watched)
      .addEventListener('click', e => {
        this.#setSelectedStyle(CLASSLIST_ACTION.ADD, CLASSLIST_ACTION.REMOVE);
        this.#curLibrary = USER_LIBRARY_ENUM.WATCHED;
      });
    this.#refs.btnQueue = document
      .querySelector(options.buttons.queue)
      .addEventListener('click', e => {
        this.#setSelectedStyle(CLASSLIST_ACTION.REMOVE, CLASSLIST_ACTION.ADD);
        this.#curLibrary = USER_LIBRARY_ENUM.QUEUE;
      });
  }

  #setSelectedStyle(action1, action2) {
    this.#refs.btnQueue.classList[action1](this.options.isSelectedStyle);
    this.#refs.btnWatched.classList[action2](this.options.isSelectedStyle);
  }

  add(card) {}
  all() {}
  update(card) {}
  remove(card) {}
}
