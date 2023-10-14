import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'

export function CustomNavBar() {
    return (
      <Navbar style={{ backgroundColor:'var(--background)'}}>
      <Container 
        fluid 
        style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Navbar.Brand>
            <iframe 
              src="https://giphy.com/embed/spYiRx7B0BtDk7slLK"
              width='50px'
              height='50px'
              /></Navbar.Brand>
        <Nav variant="underline" >
          <Nav.Link href="#designs" style={{ color: "var(--textPrimary)"}}>Designs</Nav.Link>
          <Nav.Link href="#sweaters" style={{ color: "var(--textPrimary)"}}>Sweaters</Nav.Link>
          <Nav.Link href="#about-us" style={{ color: "var(--textPrimary)"}}>About Us</Nav.Link>
          <Nav.Link href="#contact-us" style={{ color: "var(--textPrimary)"}}>Contact Us</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    );
}
