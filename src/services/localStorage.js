export function setToLocalStorage(key, data) {
  localStorage.setItem(key, data);
}

export function getFromLocalStorage(key) {
  const item = localStorage.getItem(key);
  const data = item ? item : "";
  return data;
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}
