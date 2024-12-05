'use client'
import { Container } from 'react-bootstrap';
import Sweaters from './sweaters';
import Posters from './posters';
import ContactUs from './contact-us';
import CustomNavBar from '../components/navbar';
import { useEffect, useState } from 'react';
import { setCookieInBrowser, getCookie, deleteCookie } from '../components/useCookie';
import { v4 as uuidv4 } from 'uuid';

const imagePath = '/images';

// Parent component for website
export default function Home(props) {
  const [cookie, setCookie] = useState(null)

  const setNewCookie = async () => {
      // create new cookie
      const sessionToken = uuidv4();
      setCookieInBrowser('userId', sessionToken);
      newCookie = getCookie('userId')
      setCookie(newCookie)
      // insert into user
      // insert into session body {sessionToken, sessionExpiration}
      // setCookie state
  }

  useEffect(() => {
    const cookieStuff = async () => {
      let currentCookie = getCookie('userId')
      if(!currentCookie){
        await setNewCookie()
      } else {
          // if in db setCookie state
          try {
            let response = await fetch(`/api/session?sessionToken=${currentCookie}`)
            if(!response.ok){
              // no se
            } else if (response && response.rows){
              // already exists yay
            }
          } catch (error) {
            // no se
          }
          // if not in db delete cookie
            // create new cookie
            // insert into db
            // setCookie state
      }
    }
    cookieStuff()
  }, [])
  return (
      <div id="home">
        <CustomNavBar {...props}/>
        {/* <Header /> */}
        <Sweaters {...props}/>
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
