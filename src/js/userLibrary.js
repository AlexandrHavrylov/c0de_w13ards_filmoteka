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

// const test_cards = [
//   {
//     id: 436969,
//     adult: false,
//     backdrop_path: '/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg',

//     genre_ids: [28, 12, 35, 878],
//     original_language: 'en',
//     original_title: 'The Suicide Squad',
//     poster_path: '/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg',
//     video: false,
//     vote_average: 8.2,
//     vote_count: 1203,
//     overview:
//       'Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.',
//     release_date: '2021-07-28',
//     title: 'The Suicide Squad',
//     popularity: 4168.234,
//     media_type: 'movie',
//     isWatched: false,
//     isQueue: true,
//   },

//   {
//     id: 385128,
//     title: 'F9',
//     overview:
//       "Dominic Toretto and his crew battle the most skilled assassin and high-performance driver they've ever encountered: his forsaken brother.",
//     release_date: '2021-05-19',
//     adult: false,
//     backdrop_path: '/xXHZeb1yhJvnSHPzZDqee0zfMb6.jpg',
//     vote_count: 2315,

//     genre_ids: [28, 80, 53],
//     vote_average: 7.7,
//     original_language: 'en',
//     original_title: 'F9',
//     poster_path: '/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg',
//     video: false,
//     popularity: 4973.593,
//     media_type: 'movie',
//     isWatched: true,
//     isQueue: false,
//   },

//   {
//     id: 451048,

//     genre_ids: [12, 14, 35, 28],
//     original_language: 'en',
//     original_title: 'Jungle Cruise',
//     poster_path: '/9dKCd55IuTT5QRs989m9Qlb7d2B.jpg',
//     video: false,
//     vote_average: 8,
//     overview:
//       'Dr. Lily Houghton enlists the aid of wisecracking skipper Frank Wolff to take her down the Amazon in his dilapidated boat. Together, they search for an ancient tree that holds the power to heal – a discovery that will change the future of medicine.',
//     release_date: '2021-07-28',
//     vote_count: 1286,
//     title: 'Jungle Cruise',
//     adult: false,
//     backdrop_path: '/bwBmo4I3fqMsVvVtamyVJHXGnLF.jpg',
//     popularity: 5812.972,
//     media_type: 'movie',
//     isWatched: true,
//     isQueue: true,
//   },
// ];

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

    // this.#storage.update({ ...test_cards[0], release_date: '5555-55-55' });
    // this.#storage.add(test_cards[0]);
    // this.#storage.add(test_cards[1]);
    // this.#storage.add(test_cards[2]);
    // this.#storage.remove(test_cards[2]);
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
  add(card) {
    this.#storage.add(card);
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
    const exp = this.#curLibrary === USER_LIBRARY_ENUM.WATCHED ? 'isWatched' : 'isQueue';
    const cards = this.#storage.all().filter(card => card[exp]);
    this.#refs.cardContainer.innerHTML = galleryMarkup(cards);
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
