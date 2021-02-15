export const addClass = ({ dataset, classList }) => {
  const { classToggle } = dataset;
  classList.add(classToggle);
};

export const removeClass = ({ dataset, classList }) => {
  const { classToggle } = dataset;
  classList.remove(classToggle);
};

export const toggleClass = ({ dataset, classList }) => {
  const { classToggle } = dataset;
  classList.toggle(classToggle);
};

export const renderTasks = (data, container) => {
  container.textContent = '';

  data.forEach(({ name, isEdited, isCompleted }, key) => {
    const form = `<form id="formEdit" class="edit-box" onsubmit="return false;">
        <input class="edit-box__input" type="text" value="${name}"/>
        <div class="edit-box__buttons" data-task-key="${key}">
          <div class="button-box">
            <i class="button-box__action-ico fas fa-check" data-action="accept-edit"></i>
          </div>
          <div class="button-box">
            <i class="button-box__action-ico fas fa-times" data-action="close-edit"></i>
          </div>
        </div>
      </form>`;

    const element = `<li class="listing__item" data-task-key="${key}" data-class-toggle="listing__item--dragging" draggable="true">
      ${
        isEdited
          ? form
          : `<input type="checkbox" class="listing__item-checkbox" data-action="status" ${isCompleted ? 'checked' : ''}>
        <label class="listing__item-name">${name}</label>
        <div class="button-box">
          <i class="button-box__action-ico fas fa-edit" data-action="edit"></i>
        </div>
        <div class="button-box">
          <i class="button-box__action-ico fas fa-trash-alt" data-action="remove"></i>
        </div>
      </li>`
      }`;

    container.innerHTML += element;
  });
};
