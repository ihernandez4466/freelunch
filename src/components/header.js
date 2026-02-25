import { Container } from 'react-bootstrap';
import { FaFire } from "react-icons/fa";

export default function Header({ imagePath, customStyle }) {
    return (
      <Container fluid>        
        <div id="brand" className="brand-section" style={{ 
            width: '100%', 
            // backgroundColor: 'var(--background)',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            ...customStyle,
            // minHeight: '100px',
            // maxHeight: '300px',
            // height: 'auto'
          }}>
            <img src={imagePath} loading="lazy" alt="freelunch header" style={{ width: '100%', height: '100%'}}></img>
        </div>
      </Container>
    );
}