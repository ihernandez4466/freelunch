import { useState } from 'react';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import { PiShoppingCartDuotone } from "react-icons/pi";
import Logo from '../components/logo';
import Cart from '../pages/cart';

export default function CustomNavBar(props) {
    const userId = props.userId;
    const handleShowCheckout = props.handleShowCheckout ? props.handleShowCheckout : null
    const showSweatersLink = props.showSweatersLink === false ? props.showSweatersLink : true
    const showPostersLink = props.showPostersLink === false ? props.showPostersLink : true
    const showContactLink = props.showContactLink === false ? props.showContactLink : true
    const showWholeSaleLink = props.showWholeSaleLink === true ? props.showWholeSaleLink : false
    const showCartLink = props.showCartLink === false ? props.showCartLink : true
    const [showCart, setShowCart] = useState(false);
    const handleClose = () => setShowCart(false);
    const handleShow = () => setShowCart(true);
    const handleShowCart = (show) => {
      if(show) handleShow();
      else handleClose();
    }

    return (
      <Navbar sticky="top" className="navbar" style={{ backgroundColor: 'var(--background)' }}>
      <Container 
        fluid 
        style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Navbar.Brand>
            <Logo />
        </Navbar.Brand>
        <Nav variant="underline" style={{ fontFamily: 'merienda' }}>
          { showSweatersLink && 
          <ScrollLink activeClass="active" to="sweaters" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle} activeStyle={activeLinkStyle}>
            Sweaters
          </ScrollLink>}
          { showPostersLink && 
          <ScrollLink activeClass="active" to="posters" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle} activeStyle={activeLinkStyle}>
            Posters
          </ScrollLink>
          }
          { showContactLink && 
          <ScrollLink activeClass="active" to="contact-us" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle} activeStyle={activeLinkStyle}>
            Contact Us
          </ScrollLink> }
          { showWholeSaleLink && 
          <ScrollLink activeClass="active" to="contact-us" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle} activeStyle={activeLinkStyle}>
            WholeSale
          </ScrollLink> }
          { showCartLink && 
          <>
            <Button variant="link" className="btn-cart" onClick={handleShow}>
              <PiShoppingCartDuotone/>
            </Button> 
            <Offcanvas data-bs-theme="dark" show={showCart} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title><h1>Cart</h1></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <Cart userId={userId} handleShowCheckout={handleShowCheckout} handleShowCart={handleShowCart}/>
              </Offcanvas.Body>
            </Offcanvas>
          </>
          }
      </Nav>
      </Container>
    </Navbar>
  );
}

const activeLinkStyle = {
  fontSize: '1rem',
  fontWeight: '700',
  color: 'var(--brand)',
  borderRadius: '5px',
  textAlign: 'center',
  textDecoration: 'none'
};

const linkStyle = {
  fontSize: '1rem',
  fontWeight: '600',
  color: 'var(--textPrimary)',
  padding: '2.5px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center'
}