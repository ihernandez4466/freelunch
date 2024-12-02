import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/styles/styles.css';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { getCookie, setCookieInBrowser, checkExpiration, deleteCookie } from '../components/useCookie';

 
// This default export is required in a new `pages/_app.js` file.
export default function Home({ Component, pageProps }) {
  const [cookie, setCookie] = useState(null);

  useEffect(() => setUser(), [])

  const setUser = () => {
    let currentCookie = getCookie('userId');
    if(currentCookie) {
      // cookie already exists verify expiration
      const expirationDate = new Date(cookieValue); // Assuming the value stores a valid date string.
      const expired = checkExpiration(expirationDate)
      if(expired){
        deleteCookie('userId')
      } else {
        // insert into db or get from db

      }
    } else {
      const newUuid = uuidv4();
      let cookie = setCookieInBrowser('userId', newUuid)
      setCookie(cookie)
    }
    // - if cookie exists: setUsername
    // - if cookie is expired
    //     - delete cookie
    // - if cookie is not expired
    //     - set username
  }

  return (
  <>
    <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <Component {...pageProps} userId={cookie}/>
  </>
)}