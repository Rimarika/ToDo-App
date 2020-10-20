export const addClass = (element) => {
  const classToggle = element.dataset.classToggle;
  element.classList.add(classToggle);
};

export const removeClass = (element) => {
  const classToggle = element.dataset.classToggle;
  element.classList.remove(classToggle);
};

export const toggleClass = (element) => {
  const classToggle = element.dataset.classToggle;
  element.classList.toggle(classToggle);
};
