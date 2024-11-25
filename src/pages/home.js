'use client'
import { useState } from 'react';
import { Button, Container, Nav, Offcanvas } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import { PiShoppingCartDuotone } from "react-icons/pi";

import Logo from '../components/logo';
import Sweaters from './sweaters';
import Posters from './posters';
import ContactUs from './contact-us';
import CustomNavBar from '../components/navbar';
import Cart from './cart';

const imagePath = '/images';

// Parent component for website
export default function Home(props) {
  return (
      <div id="home">
        <CustomNavBar Logo={Logo} NavWithLinks={HomeNavWithLinks}/>
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

const activeLinkStyle = {
  fontSize: '1.5vw',
  fontWeight: '600',
  color: 'var(--secondary)',
  borderRadius: '5px',
  textAlign: 'center',
  textDecoration: 'none'
};
const linkStyle = {
  fontSize: '1.5vw',
  fontWeight: '500',
  color: 'var(--textPrimary)',
  padding: '2.5px'
}

function HomeNavWithLinks() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Nav variant="underline" style={{ fontFamily: 'merienda' }}>
          {/* <ScrollLink activeClass="active" activeStyle={activeLinkStyle}  to="home" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle}>
            Home
          </ScrollLink> */}
          <ScrollLink activeClass="active" activeStyle={activeLinkStyle}  to="sweaters" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle}>
            Sweaters
          </ScrollLink>
          <ScrollLink activeClass="active" activeStyle={activeLinkStyle} to="posters" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle}>
            Posters
          </ScrollLink>
          <ScrollLink activeClass="active" activeStyle={activeLinkStyle} to="contact-us" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle}>
            Contact Us
          </ScrollLink>
          <Button variant="primary" onClick={handleShow}>
            <PiShoppingCartDuotone/>
          </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Cart />
        </Offcanvas.Body>
      </Offcanvas>
      </Nav>
  );
}
