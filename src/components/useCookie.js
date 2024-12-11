export const setCookieInBrowser = (cookieName, value, expirationDate) => {
  const cookie = document.cookie = `${cookieName}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  return cookie;
};

export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const getCookie = (cookieName) => {
  const cookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith(`${cookieName}=`));

  return cookie ? cookie : null
}

export const splitCookieValues = (cookie) => {
  const parts = cookie.split(';');
  const values = parts.map((attribute) => {
    let val = attribute.split('=')
    let returnVal = val.length >= 1 ? val[1] : null
    return returnVal
  })
  return values
}
