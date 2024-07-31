'use client'
import Nav from 'react-bootstrap/Nav';
import { Link as ScrollLink } from 'react-scroll';
import Sweaters from './sweaters';
import Posters from './posters';
import ContactUs from './contact-us';
import { Logo } from '../components/logo';
import Container from 'react-bootstrap/Row';
import CustomNavBar from '../components/navbar';

const imagePath = '/images';

// Parent component for website
function Home() {
  const postersPath = imagePath + '/branding/posters.png';
  return (
      <div>
        <CustomNavBar Logo={AppLogo} NavWithLinks={HomeNavWithLinks}/>
        {/* <Header /> */}
        <hr style={{ margin: '5rem 0'}}></hr>
        <Sweaters />
        <hr style={{ margin: '5rem 0'}}></hr>
        <Posters />        
        <hr style={{ margin: '5rem 0', marginBottom: '0'}}></hr>
        <ContactUs />
      </div>
  );
}

// function Header() {
//   const headerPath = imagePath + '/branding/trees_and_logo_header.png';
//   return (
//     <Container fluid id="home">    
//         <img src={headerPath} style={{ width: '100%', height: '100%'}}></img>
//     </Container>
//     );
// }

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
 
 const activeLinkStyle = {
    color: 'var(--primaryDark)',
    borderRadius: '5px',
    textAlign: 'center',
    textDecoration: 'none'
  };
  const linkStyle = {
    fontSize: '2vw',
    fontWeight: '800',
    color: 'var(--textPrimary)',
    padding: '5px'
  }
 
function HomeNavWithLinks() {
  
  return (
  <Nav variant="underline"style={{ fontFamily: 'merienda' }}>
          <ScrollLink activeClass="active" activeStyle={activeLinkStyle}  to="sweaters" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle}>
            Sweaters
          </ScrollLink>
          <ScrollLink activeClass="active" activeStyle={activeLinkStyle} to="posters" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle}>
            Posters
          </ScrollLink>
          <ScrollLink activeClass="active" activeStyle={activeLinkStyle} to="contact-us" spy={true} smooth={true} duration={300} style={linkStyle}>
            Contact Us
          </ScrollLink>
      </Nav>
  );
}
export default Home; 