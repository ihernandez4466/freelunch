'use client'
import { Container } from 'react-bootstrap';
import Sweaters from './sweaters';
import Posters from './posters';
import ContactUs from './contact-us';
import CustomNavBar from '../components/navbar';
import { useEffect, useState } from 'react';
import { setCookieInBrowser, getCookie } from '../components/useCookie';
import { v4 as uuidv4 } from 'uuid';

const imagePath = '/images';

// Parent component for website
export default function Home(props) {
  const [userId, setUserId] = useState(null);
  
  const persistCookieDatabase = async (sessionToken, expirationDate) => {
      try { // insert into session + user tables
        const userData = {id: `'${sessionToken}'`}
        let userResponse = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        const sessionData = {userId: `'${sessionToken}'`, sessionToken: `'${sessionToken}'`, sessionExpiration: expirationDate}
        let sessionResponse = await fetch('/api/session', {
            method: 'POST',
            body: JSON.stringify(sessionData),
        });
        if(!userResponse.ok || !sessionResponse.ok){
          throw error("Sorry bad response")
        } 
      } catch (error){
        console.log(error)
      }
  }
  const setNewCookie = () => {
      // create new cookie
      const sessionToken = uuidv4();
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7); // expire in 7 days
      setCookieInBrowser('userId', sessionToken, expirationDate);
      return {
        userId: sessionToken, 
        expiration: expirationDate
      }
  }

  useEffect(() => {
    const curCookie = getCookie('userId')
    if(!curCookie){
      const newCookie = setNewCookie()
      const userId = newCookie.userId
      const date = newCookie.expiration
      if(userId && date){
        persistCookieDatabase(userId, userId, date)
        setUserId(userId)
      }
    } else {
      if(!userId){
        let user = curCookie.split('userId=')[1]
        setUserId(user)
      }
    }
  }, [])


  const enhancedProps = { ...props, userId };  
  
  return (
      <div id="home">
        <CustomNavBar {...enhancedProps}/>
        {/* <Header /> */}
        <Sweaters {...enhancedProps}/>
        <hr style={{ margin: '5rem 0'}}></hr>
        <Posters />        
        <hr style={{ margin: '5rem 0', marginBottom: '0'}}></hr>
        <ContactUs />
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
