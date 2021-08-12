/*
користування:
    створити:               const userLib = new UserLibrary();
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

const USER_LIBRARY_ENUM = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};

const CLASSLIST_ACTION = {
  ADD: 'add',
  REMOVE: 'remove',
};

class UserLibrary {
  #curLibrary = USER_LIBRARY_ENUM.WATCHED;
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
    this.#curLibrary = libraryEnum;

    switch (this.#curLibrary) {
      case USER_LIBRARY_ENUM.QUEUE:
        this.#setSelectedStyle(CLASSLIST_ACTION.ADD, CLASSLIST_ACTION.REMOVE);
        break;
      case USER_LIBRARY_ENUM.WATCHED:
        this.#setSelectedStyle(CLASSLIST_ACTION.REMOVE, CLASSLIST_ACTION.ADD);

        break;
    }
    this.showFiltered();
  }
  // додати картку до Localstorage
  add(card) {
    this.#storage.add(card);
  }
  // додати картку, якщо нема або оновити, якщо є в Localstorage
  addOrUpdate(card) {
    if (this.getById(card.id)) {
      this.update(card);
    } else {
      this.add(card);
    }
  }
  // отримати картку по id
  getById(cardId) {
    return this.#storage.all().find(card => card.id === cardId);
  }
  // отримати всі картки з LocalStorage
  getAll() {
    return this.#storage.all();
  }
  // оновити картку
  update(card) {
    this.#storage.update(card);
  }
  // видалити картку
  remove(card) {
    this.#storage.remove(card);
  }

  // вивантижити картки згідно фільтру у контейнер
  showFiltered() {
    const exp = this.#curLibrary === USER_LIBRARY_ENUM.WATCHED ? 'isWatched' : 'isQueue';
    const cards = this.#storage.all().filter(card => card[exp]);
    this.#refs.cardContainer.innerHTML = galleryMarkup(cards);
  }
}
і;

// клас для роботи з Localstorage
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
