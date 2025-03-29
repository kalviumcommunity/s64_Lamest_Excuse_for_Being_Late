/**
 * Utility functions for handling cookies
 */

/**
 * Set a cookie with the given name, value, and expiration days
 * @param {string} name - The name of the cookie
 * @param {string} value - The value to store in the cookie
 * @param {number} days - The number of days until the cookie expires
 */
export const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

/**
 * Get the value of a cookie by name
 * @param {string} name - The name of the cookie to retrieve
 * @returns {string|null} The cookie value or null if not found
 */
export const getCookie = (name) => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  
  return null;
};

/**
 * Remove a cookie by setting its expiration date to the past
 * @param {string} name - The name of the cookie to remove
 */
export const removeCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

/**
 * Store user data in a cookie as JSON
 * @param {Object} userData - The user data to store
 * @param {number} days - The number of days until the cookie expires
 */
export const setUserCookie = (userData, days = 7) => {
  setCookie('user', JSON.stringify(userData), days);
};

/**
 * Get user data from the cookie
 * @returns {Object|null} The user data object or null if not found
 */
export const getUserCookie = () => {
  const userCookie = getCookie('user');
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return null;
    }
  }
  return null;
};