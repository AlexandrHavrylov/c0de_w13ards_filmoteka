import './sass/main.scss';
import { HeaderSwitcher, HEADER_ENUM } from './js/header-switch';
import { options } from 'colorette';

let currentPage = HEADER_ENUM.HOME;

const headerSwitcher = new HeaderSwitcher({ currentHeader: currentPage });
