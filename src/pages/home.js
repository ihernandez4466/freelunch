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
