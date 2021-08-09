import './sass/main.scss';
import { getRefs } from './js/get-refs';
import { onSearchFormInput } from './js/fetch-by-name';
import { onSearchBtnClick } from './js/fetch-by-name';
import { HeaderSwitcher, HEADER_ENUM } from './js/header-switch';
import { GetPopularFilms } from './js/get-popular-films';


const refs = getRefs();

refs.searchForm.addEventListener('input', onSearchFormInput);
refs.searchBtn.addEventListener('click', onSearchBtnClick);


const headerSwitcher = new HeaderSwitcher({
  onChangeCallback: page => {
    switch (page) {
      case HEADER_ENUM.HOME:
        refs.searchForm.value = ''
        GetPopularFilms();
        break;
      case HEADER_ENUM.LIBRARY:
        GetLibraryFilms();
        break;
    }
  },
});


function GetLibraryFilms() {

}
