'use client'
import Sweaters from './sweaters';
import Posters from './posters';
// import CheckoutProcess from "./checkout/process";
import CheckoutPage from './checkout';
import ContactUs from './contact-us';
import CustomNavBar from '../components/navbar';
import { useEffect, useState } from 'react';
import { setCookieInBrowser, getCookie, deleteCookie, splitCookieValues} from '../components/useCookie';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/header';

const imagePath = '/images';

// Parent component for website
export default function Home(props) {
  const [userId, setUserId] = useState(null);
  const [session, setSession] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [sessionRetryCount, setSessionRetryCount] = useState(0);
  const [sessionError, setSessionError] = useState(null);
  const [items, setItems] = useState(null);

  // const [checkoutData, setCheckoutData] = useState(null);

  const handleShowCheckout = (show, data) => {
    setShowCart(!show);
    setShowCheckout(show);
    setItems(data)
  }

  /* insert into session + user tables */
  const persistSession = async (sessionToken, expirationDate) => {
    const userData = {id: `'${sessionToken}'`}
    let userResponse = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
    let userAdded = await userResponse.json()
    if(!userResponse.ok || !userAdded){
      throw new Error('user could not be added')
    } 
    // do not try to persist session if user could not be added
    const sessionData = {userId: `'${sessionToken}'`, sessionToken: `'${sessionToken}'`, sessionExpiration: `'${expirationDate}'`}
    let sessionResponse = await fetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(sessionData),
    });
    let sessionAdded = await sessionResponse.json()
    if(!sessionResponse.ok || !sessionAdded){
      throw new Error('session could not be added')
    } 
    setUserId(sessionToken)
    console.log(`Session ${sessionToken} persisted successfully`);
  }

  /* set cookie only in browser */
  const setNewSession = () => {
      // create new cookie
      const sessionToken = uuidv4();
      const expirationDate = new Date();  
      expirationDate.setDate(expirationDate.getDate() + 7); // expire in 7 days
      const newSession = setCookieInBrowser('userId', sessionToken, expirationDate);
      console.log(`Session ${sessionToken} set in browser`);
      return newSession
  }

  /* validate session state is a persisted user or session */
  const validateSession = async () => {
    const values = splitCookieValues(session)
    try {
        const user = values.length >= 1 ? values[0] : null
        if (user === null || user === undefined) {
          throw new Error('session value is empty')
        }
        let userResponse = await fetch(`/api/user?id=${user}`)
        let userRow = await userResponse.json()
        let validUser = userRow ? userRow.rows.length > 0 : false
        let sessionResponse = await fetch(`/api/session?userId=${user}`)
        let sessionRow = await sessionResponse.json()
        let validSession = sessionRow ? sessionRow.rows.length > 0 : false
        if(validUser && validSession){
          setUserId(user) 
        } else {
          throw new Error('user does not exist in database')
        }
        console.log(`Session ${user} successfully validated`);
    } catch (error) {
        console.log(`Session invalid: ${error.message}`);
        deleteCookie('userId') // retry on errors
        setSession(null)
    }
  }

  useEffect(() => {
    const MAX_RETRY_ATTEMPTS = 10;
    
    const initializeSession = async () => {
      // If we've exceeded max retries or there's a permanent error, don't retry
      if (sessionRetryCount >= MAX_RETRY_ATTEMPTS) {
        if (!sessionError) {
          setSessionError('Maximum session initialization attempts exceeded. Please refresh the page to try again.');
          console.error('Session initialization failed after maximum attempts');
        }
        return;
      }

      const curCookie = getCookie('userId')
      if(!curCookie){
        try {
          const newSession = setNewSession();
          const values = splitCookieValues(newSession);
          const user = values[0];
          const expiration = values[1];
          await persistSession(user, expiration);
          setSession(newSession);
          // Reset retry count on success
          setSessionRetryCount(0);
          setSessionError(null);
        } catch (error) {
          console.error(`Session initialization attempt ${sessionRetryCount + 1} failed:`, error.message);
          
          // Clean up on error
          deleteCookie('userId');
          setSession(null);
          
          // Increment retry count
          setSessionRetryCount(prev => prev + 1);
          
          // Add exponential backoff delay before next retry
          const delay = Math.min(1000 * Math.pow(2, sessionRetryCount), 10000); // Max 10 seconds
          setTimeout(() => {
            // This will trigger the useEffect again due to sessionRetryCount change
          }, delay);
        }
      } else {
        console.log(`Session already set: ${curCookie}`);
        if(!userId){
          setSession(curCookie)
        }
        // Reset retry count when session exists
        setSessionRetryCount(0);
        setSessionError(null);
      }
    };

    initializeSession()
  }, [session, sessionRetryCount, sessionError, userId])

  useEffect(() => {
    if (session) {
      validateSession();
    }
  }, [session]);

  const enhancedProps = { ...props, userId, handleShowCheckout, showCart};  
  
  return (
      <div>
        {showCheckout ? 
         (<>
            <CustomNavBar handleShowCheckout={handleShowCheckout} showCart={false} showHomeLink={true} showSweatersLink={false} showPostersLink={false} showContactLink={false} showCartLink={false} />
            {/* <CheckoutProcess userId={userId} />  */}
            <CheckoutPage items={items}/>
          </>)
          : 
          (<>
            <CustomNavBar {...enhancedProps}/>
            <Header imagePath={imagePath}/>
            <div style={{ padding: '50px 50px 50px 50px' }}>
              <Sweaters {...enhancedProps} />
              <hr style={{ margin: '4rem 0' }}></hr>
              <Posters {...enhancedProps} />
              <hr style={{ margin: '4rem 0' }}></hr>
              <ContactUs {...enhancedProps} />
            </div>
          </>)
        }
      </div>
  );
}