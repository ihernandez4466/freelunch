  export const setCookieInBrowser = (cookieName, value) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // this is 7 months not 7 days 
    const cookie = document.cookie = `${cookieName}=${value}; Secure; HttpOnly; expires=${expirationDate.toUTCString()}; path=/`;
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
