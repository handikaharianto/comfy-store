export function getLocalStorage() {
  return JSON.parse(localStorage.getItem('cartItems')) || []
}

export function updateLocalStorage(items) {
  localStorage.setItem('cartItems', JSON.stringify(items))
}
