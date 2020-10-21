import '../scss/style.scss';
import { addClass, removeClass, toggleClass } from './utils';

const addButton = document.getElementById('addButton');
const searchButton = document.getElementById('searchButton');

const addIcon = document.getElementById('addIcon');
const addIconClose = document.getElementById('addIconClose');
const searchIcon = document.getElementById('searchIcon');
const searchIconClose = document.getElementById('searchIconClose');
const formBox = document.getElementById('formBox');
const formAdd = document.getElementById('formAdd');
const formSearch = document.getElementById('formSearch');

window.addEventListener('load', () => {
  [addIcon, searchIcon].forEach(addClass);
});

addButton.addEventListener('click', () => {
  [addIcon, addIconClose, formAdd, !formSearch.classList.contains(formSearch.dataset.classToggle) && formBox].filter(Boolean).forEach(toggleClass);
  addClass(searchIcon);
  [searchIconClose, formSearch].forEach(removeClass);
});

searchButton.addEventListener('click', () => {
  [searchIcon, searchIconClose, formSearch, !formAdd.classList.contains(formAdd.dataset.classToggle) && formBox].filter(Boolean).forEach(toggleClass);
  addClass(addIcon);
  [addIconClose, formAdd].forEach(removeClass);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    [addIcon, searchIcon].forEach(addClass);
    [addIconClose, searchIconClose, formBox, formAdd, formSearch].forEach(removeClass);
  }
});
