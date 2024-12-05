import { useState } from 'react';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import { PiShoppingCartDuotone } from "react-icons/pi";
import Logo from '../components/logo';
import Cart from '../pages/cart';

export default function CustomNavBar(props) {
    const userId = props.userId;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <Navbar sticky="top" style={{ height: '50px', backgroundColor:'white'}}>
      <Container 
        fluid 
        style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Navbar.Brand>
            <Logo />
        </Navbar.Brand>
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
          <Offcanvas.Title><h2>Cart</h2></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Cart userId={userId}/>
        </Offcanvas.Body>
      </Offcanvas>
      </Nav>
      </Container>
    </Navbar>
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