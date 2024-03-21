'use client'
import Nav from 'react-bootstrap/Nav';
import { Link as ScrollLink } from 'react-scroll';
import Sweaters from './sweaters';
import Designs from './designs';
import ContactUs from './contact-us';
import { Logo } from '../components/logo';
import CustomNavBar from '../components/navbar';

const imagePath = '/images';

// Base function for the whole website
function Home() {
  return (
      <div>
        <CustomNavBar Logo={AppLogo} NavWithLinks={HomeNavWithLinks}/>
        <Header />
        <Sweaters />
        <hr style={{ margin: '5rem 0', marginBottom: 0}}></hr>
        <Designs />
        <hr style={{ margin: '5rem 0', marginBottom: 0}}></hr>
        <ContactUs />
      </div>
  );
}

function Header() {
  const headerPath = imagePath + '/branding/freelunch.png'
  const brandPath = imagePath + '/red-trees-blur.png'
  return (
    <div id="home" style={{ position: 'relative', width: '100%', height: '300px' }}>
      <img src={headerPath} alt="Your Image" style={{ width: '100%', height: '450px', position: 'absolute', top: '-65px', left: '0' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', width: '100%' }}>
        <img src={brandPath} style={{ height: '200px', bottom: '10px'}}/>
      </div>
    </div>
  );
}

function AppLogo() {
  const logoPath = imagePath + '/branding/logo-icon.png';  
  return (
   <>
    <Logo 
      imgSrc={logoPath}
      customStyle={{ height: '50px' }} />
   </>
  );
 }
 
 const customLinkStyle = {
  textDecoration: 'underline',
  textUnderlineOffset: '15px' // Adjust as needed
};

function HomeNavWithLinks() {
  return (
  <Nav variant="underline"style={{ fontFamily: 'merienda' }}>
          <ScrollLink activeClass="active" activeStyle={customLinkStyle} to="home" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontWeight: 800, fontSize: '20px'}}>
            Home
          </ScrollLink>
          <ScrollLink activeClass="active" activeStyle={customLinkStyle} to="sweaters" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontWeight: 800, fontSize: '20px'}}>
            Sweaters
          </ScrollLink>
          <ScrollLink activeClass="active" activeStyle={customLinkStyle} to="designs" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontWeight: 800, fontSize: '20px'}}>
            Designs
          </ScrollLink>
          <ScrollLink activeClass="active" activeStyle={customLinkStyle} to="contact-us" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontWeight: 800, fontSize: '20px' }}>
            Contact Us
          </ScrollLink>
        </Nav>
  );
}
export default Home; 