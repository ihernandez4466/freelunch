import { useState } from 'react';
import Row from 'react-bootstrap/Row';

/**
 * Functional component that renders page for posters (currently only a single image but should be broken up into widgets).
 */

export default function Posters() {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    return(
        <div id="posters" style={{
            alignContent: 'center',
            alignItems: 'center',
        }}>
            {/* <Row>
                    <h1>
                        Posters
                    </h1>
            </Row> */}
            <Row><div style={{ padding: '30px', backgroundColor: 'var(--primary-transparent)', borderRadius: '20px 20px 20px 20px', display: 'flex', justifyContent: 'center'}}><h2>Posters Coming Soon</h2></div></Row>
        </div>
    );
}