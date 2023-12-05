'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { CustomNavBar } from '../components/navbar';
import { Designs } from './designs';
 
function Home() {
  return (
      <div>
        <CustomNavBar/>
        {/* <Row> */}
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
                src={process.env.REACT_APP_HOST + '/images/branding/freeLunchLettering.png'}
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
                src={process.env.REACT_APP_HOST + '/images/branding/signature-transparent.png'}
              />
            </div>
        </div>
            <hr style={{ margin: '5rem 0'}}></hr>
        {/* <Row id="designs" style={{ marginTop: '20%', padding: '20px'}}> */}
            <Designs id="designs" />
        {/* </Row> */}
      </div>
  );
}

export default Home; 