'use client'
import Nav from 'react-bootstrap/Nav';
import { Link as ScrollLink } from 'react-scroll';
import Sweaters from './sweaters';
import Posters from './posters';
import ContactUs from './contact-us';
import { Logo } from '../components/logo';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Row';
import CustomNavBar from '../components/navbar';

const imagePath = '/images';

// Base function for the whole website
function Home() {
  const postersPath = imagePath + '/branding/posters.png';
  return (
      <div>
        <CustomNavBar Logo={AppLogo} NavWithLinks={HomeNavWithLinks}/>
        <Header />
        <hr style={{ margin: '5rem 0'}}></hr>
        <Sweaters />
        <hr style={{ margin: '5rem 0'}}></hr>
        <Posters />        
        <hr style={{ margin: '5rem 0', marginBottom: '0'}}></hr>
        <ContactUs />
      </div>
  );
}

function Header() {
  const headerPath = imagePath + '/branding/trees_and_logo.png';
  return (
    <Container fluid id="home">    
      {/* <div id="home" style={{ display: 'block', width: '100%', height: '60vh' }}> */}
      <Row style={{ justifyContent: 'center', maxHeight: '70vh'}}>
        <img src={headerPath} style={{ width: '100%', height: '100%'}}></img>
      </Row>
          </Container>
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
          <ScrollLink activeClass="active" activeStyle={customLinkStyle} to="posters" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontWeight: 800, fontSize: '20px'}}>
            Posters
          </ScrollLink>
          <ScrollLink activeClass="active" activeStyle={customLinkStyle} to="contact-us" spy={true} smooth={true} duration={300} offset={-50} style={{ color: 'var(--textPrimary)', fontWeight: 800, fontSize: '20px' }}>
            Contact Us
          </ScrollLink>
        </Nav>
  );
}
export default Home; 