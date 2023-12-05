import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

export function LandingPage() {
    return (
      <>
      <div id="home" style={{ 
        display: 'flex', 
        justifyContent: 'center',
        position: 'relative',
        zIndex: '0',
        padding: '40px',
        marginTop: '10%'
        }}>
            <Image
              style={{ 
                width:'50%',
                boxShadow: '15px 10px 25px black, -30px 26px 2px rgb(92, 6, 6, 0.5), 30px -26px 0px rgb(92, 6, 6)' }}
              src={'http://localhost:3000/images/freeLunchLettering.png'}
            />
          <div style={{   
              position: 'absolute',
              left: '35%',
              top: '35%',
              zIndex: '1',
              width:'30%',
            }}>
           <Image
              style={{ 
                width:'100%'}}
              src={'http://localhost:3000/images/signature-transparent.PNG'}
            />
          </div>
      </div>
      </>
    );
}