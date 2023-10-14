'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CustomNavBar } from '../components/navbar';
import { LandingPage } from '../components/landingPage';
 
function Home() {
  return (
      <div>
        <CustomNavBar/>
        <Row>
            <LandingPage />
        </Row>
      </div>
  );
}

export default Home; 