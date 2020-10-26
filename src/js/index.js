import '../scss/style.scss';
import { addClass, removeClass, toggleClass, renderTasks } from './utils';
import TaskMenager, { todoType, doneType } from './taskMenager';

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
  const [input] = e.target.elements;

  taskMenager.addTask(input.value);
  renderTasks(taskMenager.todoTasks, todoListing);
  input.value = '';
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
