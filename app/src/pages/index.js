'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CustomNavBar } from '../components/navbar';
import { DesignSlides } from '../components/designslides';
 
function Home() {
  return (
      <Container fluid>
        <CustomNavBar/>
        <Row>
            <DesignSlides />
        </Row>
      </Container>
  );
}

export default Home; 