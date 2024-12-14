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
        if(validUser){
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

  const enhancedProps = { ...props, userId };  
  
  return (
      <div>
        <CustomNavBar {...enhancedProps}/>
        {/* <Header /> */}
        <div style={{padding:'50px 50px 50px 50px'}}>
          <Sweaters {...enhancedProps}/>
          <hr style={{ margin: '4rem 0'}}></hr>
          <Posters {...enhancedProps}/>        
          <hr style={{ margin: '4rem 0'}}></hr>
          <ContactUs {...enhancedProps}/>
        </div>
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
