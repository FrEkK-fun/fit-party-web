export function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadLocal(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

export function removeLocal(key) {
  localStorage.removeItem(key);
}

export function clearLocal() {
  localStorage.clear();
}
