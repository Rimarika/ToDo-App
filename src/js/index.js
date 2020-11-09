import '../scss/style.scss';
import { addClass, removeClass, toggleClass, renderTasks } from './utils';
import TaskMenager, { todoType, doneType } from './taskMenager';
import { data } from 'autoprefixer';

const taskMenager = new TaskMenager();

const addButton = document.getElementById('addButton');
const searchButton = document.getElementById('searchButton');

const addIcon = document.getElementById('addIcon');
const addIconClose = document.getElementById('addIconClose');
const searchIcon = document.getElementById('searchIcon');
const searchIconClose = document.getElementById('searchIconClose');
const formBox = document.getElementById('formBox');
const formAdd = document.getElementById('formAdd');
const formSearch = document.getElementById('formSearch');
const todoListing = document.getElementById('todoListing');
const doneListing = document.getElementById('doneListing');
const formSearchButton = document.getElementById('formSearchButton');
const formSearchIco = document.getElementById('formSearchIco');

let timeout = null;

window.addEventListener('load', () => {
  [addIcon, searchIcon].forEach(addClass);
  renderTasks(taskMenager.todoTasks, todoListing);
  renderTasks(taskMenager.doneTasks, doneListing);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    [addIcon, searchIcon].forEach(addClass);
    [addIconClose, searchIconClose, formBox, formAdd, formSearch].forEach(removeClass);
  }
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

formAdd.addEventListener('submit', (e) => {
  e.preventDefault();
  const [input] = formAdd.elements;
  if (input.value === '') return;

  taskMenager.addTask(input.value);
  renderTasks(taskMenager.todoTasks, todoListing);
  input.value = '';
});

formSearch.addEventListener('input', (e) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const { matchedTodoTasks, matchedDoneTasks } = taskMenager.getMatchedTasks(e.target.value);
    renderTasks(matchedTodoTasks, todoListing);
    renderTasks(matchedDoneTasks, doneListing);
  }, 800);

  const { dataset, classList } = formSearchIco;
  const { searchClass, timesClass } = dataset;

  if (e.target.value !== '') {
    classList.add(timesClass);
    classList.remove(searchClass);
  } else {
    classList.add(searchClass);
    classList.remove(timesClass);
  }
});

formSearchButton.addEventListener('click', () => {
  const [input] = formSearch.elements;
  if (input.value === '') return;

  input.value = '';
  renderTasks(taskMenager.todoTasks, todoListing);
  renderTasks(taskMenager.doneTasks, doneListing);
});

todoListing.addEventListener('click', (e) => {
  const action = e.target.dataset.action;

  if (action === 'remove') {
    taskMenager.removeTask(e.target.parentNode.parentNode, todoType);
    renderTasks(taskMenager.todoTasks, todoListing);
  } else if (action === 'edit') {
    taskMenager.editTask(e.target.parentNode.parentNode, todoType);
    renderTasks(taskMenager.todoTasks, todoListing);
    renderTasks(taskMenager.doneTasks, doneListing);
  } else if (action === 'status') {
    taskMenager.changeStatusTask(e.target.parentNode, todoType);
    renderTasks(taskMenager.todoTasks, todoListing);
    renderTasks(taskMenager.doneTasks, doneListing);
  } else if (action === 'close-edit') {
    taskMenager.closeEditedTask(e.target.parentNode.parentNode, todoType);
    renderTasks(taskMenager.todoTasks, todoListing);
  } else if (action === 'accept-edit') {
    const inputEdit = document.querySelector('.edit-box__input');
    taskMenager.saveEditedTask(e.target.parentNode.parentNode, todoType, inputEdit.value);
    renderTasks(taskMenager.todoTasks, todoListing);
  }
});

doneListing.addEventListener('click', (e) => {
  const action = e.target.dataset.action;

  if (action === 'remove') {
    taskMenager.removeTask(e.target.parentNode.parentNode, doneType);
    renderTasks(taskMenager.doneTasks, doneListing);
  } else if (action === 'edit') {
    taskMenager.editTask(e.target.parentNode.parentNode, doneType);
    renderTasks(taskMenager.todoTasks, todoListing);
    renderTasks(taskMenager.doneTasks, doneListing);
  } else if (action === 'status') {
    taskMenager.changeStatusTask(e.target.parentNode, doneType);
    renderTasks(taskMenager.todoTasks, todoListing);
    renderTasks(taskMenager.doneTasks, doneListing);
  } else if (action === 'close-edit') {
    taskMenager.closeEditedTask(e.target.parentNode.parentNode, doneType);
    renderTasks(taskMenager.doneTasks, doneListing);
  } else if (action === 'accept-edit') {
    const inputEdit = document.querySelector('.edit-box__input');
    taskMenager.saveEditedTask(e.target.parentNode.parentNode, doneType, inputEdit.value);
    renderTasks(taskMenager.doneTasks, doneListing);
  }
});
