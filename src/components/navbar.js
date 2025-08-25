import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import { PiShoppingCartDuotone } from "react-icons/pi";
import { IoMdArrowBack } from "react-icons/io";
import Logo from '../components/logo';
import Cart from '../pages/cart';

export default function CustomNavBar(props) {
    const userId = props.userId;
    const handleShowCheckout = props.handleShowCheckout ? props.handleShowCheckout : null
    const showHomeLink = props.showHomeLink
    const showSweatersLink = props.showSweatersLink == false ? props.showSweatersLink : true
    const showPostersLink = props.showPostersLink == false ? props.showPostersLink : true
    const showContactLink = props.showContactLink == false ? props.showContactLink : true
    const showCartLink = props.showCartLink == false ? props.showCartLink : true
    const [showCart, setShowCart] = useState(false);
    const handleClose = () => setShowCart(false);
    const handleShow = () => setShowCart(true);
    const handleShowCart = (show) => {
      if(show) handleShow();
      else handleClose();
    }
    const router = useRouter();
    const handleHomeClick = () => {
      router.replace(router.asPath);
    };
    return (
      <Navbar sticky="top" style={{ height: '50px', backgroundColor:'white'}}>
      <Container 
        fluid 
        style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Navbar.Brand>
            <Logo />
        </Navbar.Brand>
        <Nav variant="underline" style={{ fontFamily: 'merienda' }}>
          { showHomeLink && <Link href='/' onClick={handleHomeClick}><IoMdArrowBack className='btn-primary' style={{ color: 'white', fontSize: '20px'}}/></Link>}
          { showSweatersLink && 
          <ScrollLink activeClass="active" activeStyle={activeLinkStyle}  to="sweaters" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle}>
            Sweaters
          </ScrollLink>}
          { showPostersLink && 
          <ScrollLink activeClass="active" activeStyle={activeLinkStyle} to="posters" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle}>
            Posters
          </ScrollLink>
          }
          { showContactLink && 
          <ScrollLink activeClass="active" activeStyle={activeLinkStyle} to="contact-us" spy={true} smooth={true} duration={300} offset={-50} style={linkStyle}>
            Contact Us
          </ScrollLink> }
          { showCartLink && 
          <>
            <Button className="btn-cart" onClick={handleShow}>
              <PiShoppingCartDuotone/>
            </Button> 
            <Offcanvas show={showCart} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title><h1 style={{color: 'var(--textSecondary)'}}>Cart</h1></Offcanvas.Title>
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
  fontSize: '2.5vmin',
  fontWeight: '700',
  color: 'var(--secondary)',
  borderRadius: '5px',
  textAlign: 'center',
  textDecoration: 'none'
};

const linkStyle = {
  fontSize: '2.5vmin',
  fontWeight: '600',
  color: 'var(--textSecondary)',
  padding: '2.5px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center'
}