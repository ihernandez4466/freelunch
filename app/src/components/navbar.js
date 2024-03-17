import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

/**
 * Functional component that renders a custom navigation bar.
 *    @param {ReactNode} props.Logo - The logo component
 *    @param {ReactNode} props.NavWithLinks - The navigation component with links
 */
export default function CustomNavBar({ Logo, NavWithLinks }) {
    return (
      <Navbar sticky="top" style={{ height: '50px', backgroundColor:'rgb(255, 255, 255, 0.8)'}}>
      <Container 
        fluid 
        style={{ justifyContent: 'space-between', display: 'flex' }}>
        <Navbar.Brand>
            <Logo />
        </Navbar.Brand>
        <NavWithLinks />
      </Container>
    </Navbar>
  );
}

CustomNavBar.propTypes = {
  Logo: PropTypes.elementType,
  NavWithLinks: PropTypes.elementType.isRequired,
};