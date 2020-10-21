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
