/*
користування:
    import userLibrary from 'path/to/library';
    додати картку:          userLib.add(card);
    змінити картку:         userLib.update(card);
    видалити картку:        userLib.remove(card);
    отримати всі картки:    userLib.getAll();
    показати згідно вибраної кнопки: userLib.showFiltered();
*/

import galleryMarkup from '../templates/filmsInGallery.hbs';

const defaultOptions = {
  isSelectedStyle: 'form__btn--current',
  buttons: {
    watched: '#watched',
    queue: '#queue',
  },
  cardContainer: '.movie-list',
};

export const USER_LIBRARY_ENUM = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};

const CLASSLIST_ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
};

class UserLibrary {
  curLibrary = USER_LIBRARY_ENUM.WATCHED;
  #refs = {};
  #storage = new Storage();

  constructor(args) {
    this.options = { ...defaultOptions, ...args };

    this.#refs.btnWatched = document.querySelector(this.options.buttons.watched);
    this.#refs.btnWatched.addEventListener('click', e => {
      this.switchTo(USER_LIBRARY_ENUM.WATCHED);
    });
    this.#refs.btnQueue = document.querySelector(this.options.buttons.queue);
    this.#refs.btnQueue.addEventListener('click', e => {
      this.switchTo(USER_LIBRARY_ENUM.QUEUE);
    });

    this.#refs.cardContainer = document.querySelector(this.options.cardContainer);
  }

  #setSelectedStyle(action1, action2) {
    this.#refs.btnQueue.classList[action1](this.options.isSelectedStyle);
    this.#refs.btnWatched.classList[action2](this.options.isSelectedStyle);
  }
  switchTo(libraryEnum = USER_LIBRARY_ENUM.WATCHED) {
    this.curLibrary = libraryEnum;

    switch (this.curLibrary) {
      case USER_LIBRARY_ENUM.QUEUE:
        this.#setSelectedStyle(CLASSLIST_ACTION.ADD, CLASSLIST_ACTION.REMOVE);
        break;
      case USER_LIBRARY_ENUM.WATCHED:
        this.#setSelectedStyle(CLASSLIST_ACTION.REMOVE, CLASSLIST_ACTION.ADD);

        break;
    }
    this.showFiltered();
  }
  add(card) {
    this.#storage.add(card);
  }

  addOrUpdate(card) {
    if (this.getById(card.id)) {
      this.update(card);
    } else {
      this.add(card);
    }
  }

  getById(cardId) {
    return this.#storage.all().find(card => card.id === cardId);
  }
  getAll() {
    return this.#storage.all();
  }
  update(card) {
    this.#storage.update(card);
  }
  remove(card) {
    this.#storage.remove(card);
  }
  showFiltered() {
    const cards =
      this.curLibrary === USER_LIBRARY_ENUM.WATCHED ? getWatchedCards() : getQuereueCards();
    this.#refs.cardContainer.innerHTML = galleryMarkup(cards);
  }
  // Отримати всі картки isWatched
  getWatchedCards = () => this.#storage.all().find(card => card?.isWatched);
  // Отримати всі картки isQueue
  getQuereueCards = () => this.#storage.all().find(card => card?.isQueue);

  processCard(card) {
    if (card.isWatched || card.isQueue) {
      this.addOrUpdate(card);
    } else {
      this.remove(card);
    }
  }
}

class Storage {
  STORAGE_KEY = 'userLibrary';

  #db = [];

  constructor() {
    this.#load();
    console.log('db', this.#db);
  }
  all() {
    return this.#db;
  }

  add(item) {
    const findItem = this.#db.find(i => i.id === item.id);
    if (!findItem) {
      this.#db.push(item);
      this.#save();
    }
  }

  update(item) {
    console.log('update', item);
    let findItem = this.#db.find(i => i.id === item.id);
    if (findItem) {
      this.remove(findItem);
      this.add({ ...findItem, ...item });
    }
  }
  remove(item) {
    this.#db = this.#db.filter(i => i.id !== item.id);
    this.#save();
  }

  #save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.#db));
  }
  #load() {
    const str = localStorage.getItem(this.STORAGE_KEY);
    if (str) {
      try {
        this.#db = JSON.parse(str);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
}

export default new UserLibrary();
