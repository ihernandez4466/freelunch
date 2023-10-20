import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
//import Link from 'next/link';
import Image from 'react-bootstrap/Image';
import { Link as ScrollLink } from 'react-scroll';

export function CustomNavBar() {
    return (
      <Navbar sticky="top" style={{ backgroundColor:'rgb(255, 255, 255, 0.8)'}}>
      <Container 
        fluid 
        style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Navbar.Brand>
            <Image 
              src="http://localhost:3000/images/logo-icon.png"
              style={{
              height:'50px'}}
              ></Image>
        </Navbar.Brand>
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
      </Container>
    </Navbar>
    );
}
