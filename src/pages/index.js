'use client'
import { Container } from 'react-bootstrap';
import Sweaters from './sweaters';
import Posters from './posters';
import CheckoutProcess from "./checkout/process";
import ContactUs from './contact-us';
import CustomNavBar from '../components/navbar';
import { useEffect, useState } from 'react';
import { setCookieInBrowser, getCookie, deleteCookie, splitCookieValues} from '../components/useCookie';
import { v4 as uuidv4 } from 'uuid';
import { FaFire } from "react-icons/fa";

const imagePath = '/images';

// Parent component for website
export default function Home(props) {
  const [userId, setUserId] = useState(null);
  const [session, setSession] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCart, setShowCart] = useState(false);
  // const [checkoutData, setCheckoutData] = useState(null);

  const handleShowCheckout = (show, data) => {
    console.log(`inside handleShowCheckout at home: show: ${show} data: ${data}`);
    console.log(`before changes are made to showCart :${showCart}`);
    setShowCart(!show);
    setShowCheckout(show);
    // setCheckoutData(data);
    // console.log(`after changes are made to showCart :${showCart} showCheckout: ${showCheckout}`);
  }

  /* insert into session + user tables */
  const persistSession = async (sessionToken, expirationDate) => {
    try {
      const userData = {id: `'${sessionToken}'`}
      let userResponse = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify(userData),
      });
      let userAdded = await userResponse.json()
      const sessionData = {userId: `'${sessionToken}'`, sessionToken: `'${sessionToken}'`, sessionExpiration: `'${expirationDate}'`}
      let sessionResponse = await fetch('/api/session', {
          method: 'POST',
          body: JSON.stringify(sessionData),
      });
      let sessionAdded = await sessionResponse.json()
      if(!sessionResponse.ok || !sessionAdded){
        throw new Error('session could not be added')
      } 
      if(!userResponse.ok || !userAdded){
        throw new Error('user could not be added')
      } 
      setUserId(sessionToken)
      console.log(`Session ${sessionToken} persisted successfully`);
    } catch (error){
      console.log(`Session ${sessionToken} unable to persist: ${error.message}`);
      deleteCookie('userId') // retry on errors
      setSession(null)
    }
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
    const initializeSession = async () => {
      const curCookie = getCookie('userId')
      if(!curCookie){
        const newSession = setNewSession();
        const values = splitCookieValues(newSession);
        const user = values[0];
        const expiration = values[1];
        await persistSession(user, expiration);
        setSession(newSession)
      } else {
        console.log(`Session already set: ${curCookie}`);
        if(!userId){
          setSession(curCookie)
        }
      }
    };

    initializeSession()
  }, [session])

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
            <CheckoutProcess userId={userId} /> 
          </>)
          : 
          (<>
            <CustomNavBar {...enhancedProps}/>
            <Header />
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

function Header() {
  const headerPath = imagePath + '/branding/header_smaller.webp';
  return (
    <Container fluid style={{margin: '0px', padding: '0px'}}>        
       <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px', // Space between icons and text
        backgroundColor: 'var(--secondary)',
        color: 'white',
        padding: '10px 0',
        fontWeight: 'bold',
      }}>
        <FaFire style={{ marginLeft: '2.5px'}}/>
        <h2 style={{ margin: '0'}}>Pre-sales are live! Secure your merch at checkout!</h2>
        <FaFire style={{ marginRight: '2.5px'}}/>
      </div>
      <img
        src={headerPath}
        className="header"
        loading="lazy"
        alt="Header banner"
      />

    </Container>
    );
  }
