const defaultOptions = {
  isSelectedStyle: 'selectedStyle',
  buttons: {
    watched: 'watched',
    queue: 'queue',
  },
};

const USER_LIBRARY_ENUM = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};
this.#curLibrary = USER_LIBRARY_ENUM.WATCHED;
this.#refs = {};

class UserLibrary {
  constructor(args) {
    const options = { ...defaultOptions, ...args };

    this.#refs.btnWatched = document
      .querySelector(options.buttons.watched)
      .addEventListener('click', e => {});
    this.#refs.btnQueue = document
      .querySelector(options.buttons.queue)
      .addEventListener('click', e => {});
  }

  add(item) {}
  all() {}
  update(item) {}
  remove(item) {}
}
