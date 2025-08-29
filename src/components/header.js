import { Container } from 'react-bootstrap';
import { FaFire } from "react-icons/fa";
import CollageCarousel from './collageCarousal';

export default function Header({ imagePath }) {
    const brand = imagePath + '/branding/freelunch-signature-and-slogan.png';
    const headerPath1 = imagePath + '/branding/photo-collage-blackwhite-models.png';
    const headerPath2 = imagePath + '/branding/photo-collage-color-model1.png';
    const headerPath3 = imagePath + '/branding/photo-collage-color-model2.png';
    
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
            backgroundColor: 'var(--background)',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '20px 0',
            minHeight: '100px',
            maxHeight: '300px',
            height: 'auto'
          }}>
            <img src={brand} loading="lazy" alt="freelunch brand" style={{ 
              width: '50%', 
              maxWidth: '400px',
              minWidth: '250px',
              height: 'auto',
              display: 'block',
            }}></img>
        </div>


        <CollageCarousel>
          <img src={headerPath1} className="page-header" loading="lazy" alt="freelunch header" style={{ objectFit: 'cover', width: '100%', display: 'block' }} />
          <img src={headerPath3} className="page-header" loading="lazy" alt="freelunch collage" style={{ objectFit: 'cover', width: '100%', display: 'block' }} />
          <img src={headerPath2} className="page-header" loading="lazy" alt="freelunch header" style={{ objectFit: 'cover', width: '100%', display: 'block' }} />
        </CollageCarousel>
      </Container>
    );
}