'use client'
import Nav from 'react-bootstrap/Nav';
import { Link as ScrollLink } from 'react-scroll';
import { Designs } from './designs';
import {Row} from 'react-bootstrap/Row';
import { ContactUs } from './contact-us';
import { Logo } from '../components/logo';
import CustomNavBar from '../components/navbar';

function Header() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      <img src="http://localhost:3000/images/redwood2.png" alt="Your Image" style={{ width: '100%', height: '400px', position: 'absolute', top: '0', left: '0' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', width: '100%' }}>
        <h1 style={{color: 'black'}}>Your Text Header</h1>
      </div>
    </div>
  );
}

function Home() {
  return (
      <div>
        <CustomNavBar Logo={AppLogo} NavWithLinks={HomeNavWithLinks}/>
        <Header />
        {/* <div><Logo 
          imgSrc={'http://localhost:3000/images/branding/logo-icon.png'}
          customStyle={{ height: '100px' }} />
          <Logo 
          imgSrc={'http://localhost:3000/images/branding/freelunch.png'}
          customStyle={{ height: '100px' }} />
        </div> */}
        {/* <hr style={{ margin: '5rem 0'}}></hr> */}
        {/* <div style={myStyle}> */}
          <Designs />
        {/* </div> */}
        {/* <Designs /> */}
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