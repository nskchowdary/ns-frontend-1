export const setItem = (key, value) => {
  try {
    localStorage.removeItem(key)
    if (value) {
      localStorage.setItem(key, value)
    }
  } catch (error) {
    // console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error)
  }
}

export const removeItem = (key) => {
  localStorage.removeItem(key)
}
export const getItem = (key) => localStorage.getItem(key)
