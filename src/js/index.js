import '../scss/style.scss';

const addButton = document.querySelector('.header__trigger--add');
const searchButton = document.querySelector('.header__trigger--search');

const addIcon = document.querySelector('.header__trigger-ico--add');
const addIconClose = document.querySelector('.header__trigger-ico--add-close');
const searchIcon = document.querySelector('.header__trigger-ico--search');
const searchIconClose = document.querySelector('.header__trigger-ico--search-close');
const formBox = document.querySelector('.form-box');
const formAdd = document.querySelector('.form-box__form--add');
const formSearch = document.querySelector('.form-box__form--search');

const state = {
  showAddTask: false,
  showSearchTask: false,
};

const toggleAdd = () => {
  state.showAddTask = !state.showAddTask;
  state.showSearchTask = false;
};

const toggleSearch = () => {
  state.showAddTask = false;
  state.showSearchTask = !state.showSearchTask;
};

const setDataState = (element, state) => {
  element.setAttribute('data-state', state === true ? 'active' : 'inactive');
};

const prepareToggleElements = () => {
  setDataState(addIcon, !state.showAddTask);
  setDataState(addIconClose, state.showAddTask);
  setDataState(formAdd, state.showAddTask);
  setDataState(searchIcon, !state.showSearchTask);
  setDataState(searchIconClose, state.showSearchTask);
  setDataState(formSearch, state.showSearchTask);
};

addButton.addEventListener('click', () => {
  toggleAdd();
  prepareToggleElements();
  setDataState(formBox, state.showAddTask);
});

searchButton.addEventListener('click', () => {
  toggleSearch();
  prepareToggleElements();
  setDataState(formBox, state.showSearchTask);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    state.showAddTask = false;
    state.showSearchTask = false;
    prepareToggleElements();
    setDataState(formBox, false);
  }
});

prepareToggleElements();
