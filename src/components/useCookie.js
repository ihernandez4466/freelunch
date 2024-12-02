  export const setCookieInBrowser = (cookieName, value) => {
    const today = new Date();
    const expirationDate =  new Date(today);
    expirationDate.setDate(today.getDate() + 7); // this is 7 months not 7 days 
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

  export const checkExpiration = (cookie) => {
    if(!cookie){
      return False
    }

    try {
      const expirationDate = new Date(cookie); // Assuming the value stores a valid date string.
      const now = new Date();
      const expired = now > expirationDate;
  
      console.log(`Cookie "${cookieName}" is ${expired ? 'expired' : 'valid'}.`);
      return expired;
    } catch (error) {
      console.error('Error parsing cookie expiration date:', error);
      return true; // Treat invalid dates as expired.
    }

  }
