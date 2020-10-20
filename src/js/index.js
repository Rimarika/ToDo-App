import '../scss/style.scss';

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
  addIcon.classList.add(addIcon.dataset.classToggle);
  searchIcon.classList.add(searchIcon.dataset.classToggle);
});

addButton.addEventListener('click', () => {
  addIcon.classList.toggle(addIcon.dataset.classToggle);
  addIconClose.classList.toggle(addIconClose.dataset.classToggle);
  searchIcon.classList.add(searchIcon.dataset.classToggle);
  searchIconClose.classList.remove(searchIconClose.dataset.classToggle);
  formSearch.classList.contains(formSearch.dataset.classToggle)
    ? null
    : formBox.classList.toggle(formBox.dataset.classToggle);
  formAdd.classList.toggle(formAdd.dataset.classToggle);
  formSearch.classList.remove(formSearch.dataset.classToggle);
});

searchButton.addEventListener('click', () => {
  addIcon.classList.add(addIcon.dataset.classToggle);
  addIconClose.classList.remove(addIconClose.dataset.classToggle);
  searchIcon.classList.toggle(searchIcon.dataset.classToggle);
  searchIconClose.classList.toggle(searchIconClose.dataset.classToggle);
  formAdd.classList.contains(formAdd.dataset.classToggle)
    ? null
    : formBox.classList.toggle(formBox.dataset.classToggle);
  formAdd.classList.remove(formAdd.dataset.classToggle);
  formSearch.classList.toggle(formSearch.dataset.classToggle);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    formBox.classList.remove(formBox.dataset.classToggle);
    formAdd.classList.remove(formAdd.dataset.classToggle);
    formSearch.classList.remove(formSearch.dataset.classToggle);
  }
});
