import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';

/**
 * Functional component that renders loading animation
 */

export default function Loading() {
    const [activeSpinner, setActiveSpinner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpinner((prev) => (prev + 1) % 3); // Change '3' to the number of spinners
    }, 500); // Adjust the interval based on your preference

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Row> 
      {[0, 1, 2].map((index) => (
        <Col key={index}>        
        <Spinner
          key={index}
          animation={activeSpinner === index ? 'grow' : ''}
        /></Col>
      ))}
    </Row>
    </Container>
  );
}