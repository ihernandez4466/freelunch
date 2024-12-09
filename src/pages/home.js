'use client'
import { Container } from 'react-bootstrap';
import Sweaters from './sweaters';
import Posters from './posters';
import ContactUs from './contact-us';
import CustomNavBar from '../components/navbar';
import { useEffect, useState } from 'react';
import { setCookieInBrowser, getCookie, deleteCookie, splitCookieValues} from '../components/useCookie';
import { v4 as uuidv4 } from 'uuid';

const imagePath = '/images';

// Parent component for website
export default function Home(props) {
  const [userId, setUserId] = useState(null);
  const [session, setSession] = useState(null);

  /* insert into session + user tables */
  const persistSession = async (sessionToken, expirationDate) => {
    try {
      const userData = {id: `'${sessionToken}'`}
      let userResponse = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify(userData),
      });
      let userAdded = await userResponse.json()
      const sessionData = {userId: `'${sessionToken}'`, sessionToken: `'${sessionToken}'`, sessionExpiration: expirationDate}
      let sessionResponse = await fetch('/api/session', {
          method: 'POST',
          body: JSON.stringify(sessionData),
      });
      let sessionAdded = await sessionResponse.json()
      if(!sessionResponse.ok || !sessionAdded){
        throw error("session could not be added")
      } 
      if(!userResponse.ok || !userAdded){
        throw error("user could not be added")
      } 
      setUserId(sessionToken)
    } catch (error){
      console.log(error)
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
      setSession(newSession)
      return newSession
  }

  /* validate session state is a persisted user or session */
  const validateSession = async () => {
    try {
      const values = splitCookieValues(session)
      const user = values.length >= 1 ? values[0] : null
      if (user === null || user === undefined) {
        throw error("session value is empty")
      }
      let userResponse = await fetch(`/api/user?id=${user}`)
      let userRow = await userResponse.json()
      let validUser = userRow ? userRow.rows.length > 0 : false
      if(validUser){
        setUserId(user) 
      } else {
        throw error("user does not exist in database")
      }
    } catch (error) {
      console.log(error)
      deleteCookie('userId') // retry on errors
      setSession(null)
    }
  }

  useEffect(() => {
    const curCookie = getCookie('userId')
    if(!curCookie){
      const setSession = setNewSession()
      const values = splitCookieValues(setSession)
      const user = values[0]
      const expiration = values[1]
      persistSession(user, user, expiration)
    } else {
      if(!userId){
        setSession(curCookie)
      }
    }
  }, [session])

  useEffect(() => {
    if (session) {
      validateSession();
    }
  }, [session]);

  const enhancedProps = { ...props, userId };  
  
  return (
      <div id="home">
        <CustomNavBar {...enhancedProps}/>
        {/* <Header /> */}
        <Sweaters {...enhancedProps}/>
        <hr style={{ margin: '5rem 0'}}></hr>
        <Posters {...enhancedProps}/>        
        <hr style={{ margin: '5rem 0', marginBottom: '0'}}></hr>
        <ContactUs {...enhancedProps}/>
      </div>
  );
}

function Header() {
  const headerPath = imagePath + '/branding/logo-icon.png';
  return (
    <Container fluid style={{ justifyContent: 'center', display: 'flex', background: 'linear-gradient(var(--background) 40%, white 18%, var(--primary) 70%)'}} id="home">    
        <img src={headerPath} style={{ padding: '15px', width: '35%', height: '20vw', WebkitMaskImage: 'linear-gradient(transparent 0%, black 40%, transparent 90%)'}}></img>
    </Container>
    );
  }
