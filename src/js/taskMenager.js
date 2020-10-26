const todoType = 'TODO_TYPE';
const doneType = 'DONE_TYPE';

export default class TaskMenager {
  todoTasks = [];
  doneTasks = [];

  constructor() {
    this.getStoredState();
  }

  setStoredState = () => {
    const { todoTasks, doneTasks } = this;
    const data = { todoTasks, doneTasks };
    localStorage.setItem('todoList', JSON.stringify(data));
  };

  getStoredState = () => {
    const data = JSON.parse(localStorage.getItem('todoList'));

    if (data) {
      const { todoTasks, doneTasks } = data;
      this.todoTasks = todoTasks;
      this.doneTasks = doneTasks;
    }
  };

  addTask = (name) => {
    this.todoTasks.push({
      name,
      isEdited: false,
      isCompleted: false,
    });
    this.setStoredState();
  };

  getTasks = (taskType) => {
    const { todoTasks, doneTasks } = this;

    return [
      { type: todoType, data: todoTasks },
      { type: doneType, data: doneTasks },
    ]
      .filter(({ type }) => taskType === type)
      .map(({ data }) => data)
      .shift();
  };

  removeTask = (task, taskType) => {
    const key = task.dataset.taskKey;
    this.getTasks(taskType).splice(key, 1);

    this.setStoredState();
  };

  editTask = (task, taskType) => {
    const { todoTasks, doneTasks } = this;
    const key = task.dataset.taskKey;
    const tasks = this.getTasks(taskType);

    [...todoTasks, ...doneTasks].forEach((element) => {
      element.isEdited = false;
    });

    tasks.forEach((element, index) => {
      if (index == key) {
        element.isEdited = true;
      } else {
        element.isEdited = false;
      }
    });

    this.setStoredState();
  };

  changeStatusTask = (task, taskType) => {
    const { todoTasks, doneTasks } = this;
    const key = task.dataset.taskKey;
    const tasks = this.getTasks(taskType);

    const element = tasks[key];
    const { name, isEdited, isCompleted } = element;

    tasks.splice(key, 1);

    const replacedTask = {
      name,
      isEdited,
      isCompleted: !isCompleted,
    };

    tasks !== todoTasks && todoTasks.push(replacedTask);
    tasks !== doneTasks && doneTasks.push(replacedTask);

    this.setStoredState();
  };

  closeEditedTask = (task, taskType) => {
    const key = task.dataset.taskKey;
    this.getTasks(taskType)[key].isEdited = false;

    this.setStoredState();
  };

  saveEditedTask = (task, taskType, newName) => {
    const key = task.dataset.taskKey;

    this.getTasks(taskType)[key].name = newName;
    this.getTasks(taskType)[key].isEdited = false;

    this.setStoredState();
  };
}

export { todoType, doneType };
