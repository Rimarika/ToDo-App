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
const formSearchButton = document.getElementById('formSearchButton');
const formSearchIco = document.getElementById('formSearchIco');

const listing = document.getElementById('listing');
const containers = document.querySelectorAll('.listing__list');

let timeout = null;
let taskTypeBeforeDrag;
let taskTypeAfterDrag;

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

formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
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

    const inputEdit = document.querySelector('.edit-box__input');
    if (inputEdit) {
      inputEdit.onkeydown = (e) => {
        if (e.keyCode === 13) {
          taskMenager.saveEditedTask(e.target.parentNode.parentNode, todoType, inputEdit.value);
          renderTasks(taskMenager.todoTasks, todoListing);
          renderTasks(taskMenager.doneTasks, doneListing);
        }
      };
    }
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

    const inputEdit = document.querySelector('.edit-box__input');
    if (inputEdit) {
      inputEdit.onkeydown = (e) => {
        if (e.keyCode === 13) {
          taskMenager.saveEditedTask(e.target.parentNode.parentNode, doneType, inputEdit.value);
          renderTasks(taskMenager.todoTasks, todoListing);
          renderTasks(taskMenager.doneTasks, doneListing);
        }
      };
    }
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

containers.forEach((container) => {
  container.addEventListener('mousedown', () => {
    taskTypeBeforeDrag = container.id === 'todoListing' ? todoType : doneType;
  });
});

listing.addEventListener('mousedown', () => {
  const draggables = document.querySelectorAll('.listing__item');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      addClass(draggable);
    });

    draggable.addEventListener('dragend', () => {
      removeClass(draggable);
    });
  });

  containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector('.listing__item--dragging');

      if (!afterElement) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });

    container.addEventListener('drop', (e) => {
      e.stopImmediatePropagation();
      const draggable = document.querySelector('.listing__item--dragging');
      const afterElement = getDragAfterElement(container, e.clientY);
      let indexAfterElement = !!afterElement ? afterElement.getAttribute('data-task-key') : null;
      const indexItemBeforeDrag = draggable.getAttribute('data-task-key');
      const indexItemAfterDrag = indexItemBeforeDrag < indexAfterElement ? --indexAfterElement : indexAfterElement;
      taskTypeAfterDrag = container.id === 'todoListing' ? todoType : doneType;

      taskMenager.moveTask(draggable, taskTypeBeforeDrag, taskTypeAfterDrag, indexItemAfterDrag);

      renderTasks(taskMenager.todoTasks, todoListing);
      renderTasks(taskMenager.doneTasks, doneListing);
    });
  });
});

function getDragAfterElement(container, currentYPos) {
  const draggableElements = [...container.querySelectorAll('.listing__item:not(.listing__item--dragging)')];

  return draggableElements
    .filter((child) => {
      const box = child.getBoundingClientRect();
      return currentYPos <= box.top + box.height / 2;
    })
    .shift();
}
