import { Container } from 'react-bootstrap';
import { FaFire } from "react-icons/fa";

export default function Header({ imagePath }) {
    const brand = imagePath + '/branding/header_smaller.webp';
    
    return (
      <Container fluid>        
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
          <h2 className="banner-text" style={{ margin: '0', color: 'var(--textSecondary)'}}>Pre-sales are live! Secure your merch at checkout!</h2>
          <FaFire style={{ marginRight: '2.5px'}}/>
        </div>

        <div id="brand" className="brand-section" style={{ 
            width: '100%', 
            // backgroundColor: 'var(--background)',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '10px 0',
            // minHeight: '100px',
            // maxHeight: '300px',
            // height: 'auto'
          }}>
            <img src={brand} loading="lazy" alt="freelunch header" style={{ width: '100%', height: '50vw', backgroundColor: 'white'}}></img>
        </div>
      </Container>
    );
}