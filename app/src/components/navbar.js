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
          <Nav.Link>Designs</Nav.Link>
          <Nav.Link>Sweaters</Nav.Link>
          <Nav.Link>About Us</Nav.Link>
          <Nav.Link>Contact Us</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    );
}
