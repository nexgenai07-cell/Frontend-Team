export const incrementCounter = (key) => {
  const current = parseInt(localStorage.getItem(key) || "0", 10);
  localStorage.setItem(key, (current + 1).toString());
};

export const getCounter = (key) => {
  return parseInt(localStorage.getItem(key) || "0", 10);
};