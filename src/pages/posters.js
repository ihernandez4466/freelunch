import { Row } from 'react-bootstrap';

/**
 * Functional component that renders page for posters (currently only a single image but should be broken up into widgets).
 */

export default function Posters() {
    return(
            <Row id="posters">
                <div>
                    <h2 className="posters-header" style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'var(--background)', borderRadius: '20px 20px 20px 20px'}}>Posters Coming Soon</h2>
                </div>
            </Row>
    );
}