export const setCookieInBrowser = (cookieName, value, expirationDate) => {
  const cookie = document.cookie = `${cookieName}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  return cookie;
};

export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; path=/`;
};

export const getCookie = (cookieName) => {
  const cookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith(`${cookieName}=`));

  return cookie ? cookie : null
}
