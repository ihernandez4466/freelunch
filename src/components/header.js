import { Container } from 'react-bootstrap';
import { FaFire } from "react-icons/fa";

export default function Header({ imagePath }) {
    const headerPath = imagePath + '/branding/photo-collage-blackwhite.png';
    const brand = imagePath + '/branding/freelunch-signature-and-slogan.png';
    const headerPath2 = imagePath + '/branding/photo-collage-color.png';
    
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
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}> 
          <div style={{ width: '100%' }}>
            <img src={headerPath} className="page-header" loading="lazy" alt="freelunch header" style={{ objectFit: 'cover', width: '100%', display: 'block' }}></img>
          </div>
          <div style={{ 
            width: '100%', 
            backgroundColor: 'var(--background)',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '20px 0',
            minHeight: '200px'
          }}>
            <img src={brand} loading="lazy" alt="freelunch brand" style={{ 
              width: '50%', 
              maxWidth: '400px',
              minWidth: '250px',
              height: 'auto',
              display: 'block',
            }}></img>
          </div>
          <div style={{ width: '100%' }}>
            <img src={headerPath2} className="page-header" loading="lazy" alt="freelunch collage" style={{ objectFit: 'cover', width: '100%', display: 'block' }}></img>
          </div>
        </div>
      </Container>
      );
    }