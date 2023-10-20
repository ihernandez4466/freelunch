'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CustomNavBar } from '../components/navbar';
import { LandingPage } from '../components/landingPage';
import { Designs } from './designs';
 
function Home() {
  return (
      <div>
        <CustomNavBar/>
        {/* <Row> */}
            <LandingPage/>
            <hr style={{ margin: '5rem 0'}}></hr>
        {/* <Row id="designs" style={{ marginTop: '20%', padding: '20px'}}> */}
            <Designs id="designs" />
        {/* </Row> */}
      </div>
  );
}

export default Home; 