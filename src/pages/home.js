'use client'
import { Container } from 'react-bootstrap';
import Sweaters from './sweaters';
import Posters from './posters';
import ContactUs from './contact-us';
import CustomNavBar from '../components/navbar';

const imagePath = '/images';

// Parent component for website
export default function Home(props) {
  return (
      <div id="home">
        <CustomNavBar {...props}/>
        <Header />
        <Sweaters {...props}/>
        <hr style={{ margin: '5rem 0'}}></hr>
        <Posters />        
        <hr style={{ margin: '5rem 0', marginBottom: '0'}}></hr>
        <ContactUs />
      </div>
  );
}

const textStyle = {
  position: 'absolute',
  inset: 0,
  display: 'grid',
  placeItems: 'center',
  backgroundColor: '#000',
  color: '#fff',
  fontWeight: 900,
  fontSize: '100px',
  fontFamily: 'sans-serif',
  mixBlendMode: 'multiply',
  userSelect: 'none',
};

function Header() {
  return (
    <Container fluid style={{ justifyContent: 'center', display: 'flex', background: 'linear-gradient(var(--background) 40%, white 18%, var(--primary) 70%)'}} id="home">    
      <div style={{ position: 'relative', width: '100vw', height: '100vh'}}>
        <video style={{width: '100%', height: '100%'}} autoPlay loop muted>
          <source src="/videos/vineyards.mp4" type="video/mp4" />
        </video>
        <p style={textStyle}  >FREE LUNCH</p>
      </div>
    </Container>
    );
  }
