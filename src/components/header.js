import { Container } from 'react-bootstrap';
import { FaFire } from "react-icons/fa";

export default function Header({ imagePath }) {
    const headerPath = imagePath + '/branding/photo-collage-with-logo.png';
    const headerPath2 = imagePath + '/branding/photo-collage.png';
    
    return (
      <Container fluid style={{margin: '0px', padding: '0px'}}>        
         <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px', // Space between icons and text
          backgroundColor: 'var(--secondary)',
          color: 'white',
          padding: '10px 0',
          fontWeight: 'bold',
        }}>
          <FaFire style={{ marginLeft: '2.5px'}}/>
          <h2 style={{ margin: '0'}}>Pre-sales are live! Secure your merch at checkout!</h2>
          <FaFire style={{ marginRight: '2.5px'}}/>
        </div>
        <img src={headerPath} loading="lazy" alt="freelunch header" style={{ width: '100%', height: '50vw', backgroundColor: 'white'}}></img>
        <img src={headerPath2} loading="lazy" alt="freelunch collage"style={{ width: '100%', height: '50vw', backgroundColor: 'white'}}></img>
      </Container>
      );
    }