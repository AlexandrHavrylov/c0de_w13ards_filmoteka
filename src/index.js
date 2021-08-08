import './sass/main.scss';
import { HeaderSwitcher, HEADER_ENUM } from './js/header-switch';
import { options } from 'colorette';

let currentPage = HEADER_ENUM.HOME;

const headerSwitcher = new HeaderSwitcher({
  currentHeader: currentPage,
  hideClassCss: 'is-hidden',
  buttons: {
    home: '.header__btn--home',
    library: '.header__btn--library',
  },
  headerBackgroundImagesStyle: {
    home: 'тут має бути стиль з background image для home',
    library: 'тут має бути стиль з background image для library',
  },

  onChangeCallback: onChangePage,
});

function onChangePage(curPage) {
  currentPage = curPage;
  console.log(curPage);
  // логіка при зміні сторінки з "Home" на "My Library" і навпаки
}
