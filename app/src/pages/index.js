'use client'
import Nav from 'react-bootstrap/Nav';
import { Link as ScrollLink } from 'react-scroll';

import { Designs } from './designs';
import { ContactUs } from './contact-us';
import { LandingPage } from '../components/landingPage';
import { Logo } from '../components/logo';
import CustomNavBar from '../components/navbar';

function Home() {
  return (
      <div>
        <CustomNavBar Logo={AppLogo} NavWithLinks={HomeNavWithLinks}/>
        {/* <LandingPage /> */}
        <hr style={{ margin: '5rem 0'}}></hr>
        <Designs />
        <hr style={{ margin: '5rem 0', marginBottom: 0}}></hr>
        <ContactUs />
      </div>
  );
}

function AppLogo() {
  return (
   <>
    <Logo 
      imgSrc={'http://localhost:3000/images/branding/logo-icon.png'}
      customStyle={{ height: '50px' }} />
   </>
  );
 }

 
function HomeNavWithLinks() {
  return (
  <Nav variant="underline" >
          <ScrollLink activeClass="active" to="home" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontSize: '25px'}}>
            Home
          </ScrollLink>
          <ScrollLink activeClass="active" to="designs" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontSize: '25px'}}>
            Designs
          </ScrollLink>
          <ScrollLink activeClass="active" to="about-us" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontSize: '25px'}}>
            About Us
          </ScrollLink>
          <ScrollLink activeClass="active" to="contact-us" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontSize: '25px' }}>
            Contact Us
          </ScrollLink>
        </Nav>
  );
}
export default Home; 