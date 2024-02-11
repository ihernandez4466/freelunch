'use client'
import Nav from 'react-bootstrap/Nav';
import { Link as ScrollLink } from 'react-scroll';
import { Designs } from './designs';
import { ContactUs } from './contact-us';
import { Logo } from '../components/logo';
import CustomNavBar from '../components/navbar';

function Home() {
  return (
      <div>
        <CustomNavBar Logo={AppLogo} NavWithLinks={HomeNavWithLinks}/>
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
  <Nav variant="underline" style={{ fontFamily: 'merienda' }}>
          <ScrollLink activeClass="active" to="home" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontWeight: 800, fontSize: '20px'}}>
            Home
          </ScrollLink>
          <ScrollLink activeClass="active" to="designs" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontWeight: 800, fontSize: '20px'}}>
            Designs
          </ScrollLink>
          <ScrollLink activeClass="active" to="about-us" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontWeight: 800, fontSize: '20px'}}>
            About Us
          </ScrollLink>
          <ScrollLink activeClass="active" to="contact-us" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontWeight: 800, fontSize: '20px' }}>
            Contact Us
          </ScrollLink>
        </Nav>
  );
}
export default Home; 