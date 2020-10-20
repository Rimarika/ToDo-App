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
  [addIcon, searchIcon].forEach((element) => addClass(element));
});

addButton.addEventListener('click', () => {
  [addIcon, addIconClose, formAdd, !formSearch.classList.contains(formSearch.dataset.classToggle) && formBox]
    .filter(Boolean)
    .forEach((element) => toggleClass(element));
  addClass(searchIcon);
  [searchIconClose, formSearch].forEach((element) => removeClass(element));
});

searchButton.addEventListener('click', () => {
  [searchIcon, searchIconClose, formSearch, !formAdd.classList.contains(formAdd.dataset.classToggle) && formBox]
    .filter(Boolean)
    .forEach((element) => toggleClass(element));
  addClass(addIcon);
  [addIconClose, formAdd].forEach((element) => removeClass(element));
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    [formBox, formAdd, formSearch].forEach((element) => removeClass(element));
  }
});
