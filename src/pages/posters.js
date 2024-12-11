import Row from 'react-bootstrap/Row';

/**
 * Functional component that renders page for posters (currently only a single image but should be broken up into widgets).
 */

export default function Posters() {
    return(
        <Row id="posters" style={{ justifyContent: 'center'}}>
            {/* <img style={{
                    width: '60%', height: '60%',
                    boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                    backgroundColor: 'rgb(72, 88, 14, 0.1)',
            }}/> */}
            <h3>Posters Coming Soon</h3>
        </Row>
    );
}