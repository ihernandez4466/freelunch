import { useState } from 'react';
import { Col, Image } from 'react-bootstrap';

/**
 * Functional component that renders page for posters (currently only a single image but should be broken up into widgets).
 */

export default function Posters() {
    return(
        <div id="posters" style={{
            padding: '30px', 
            border: '2px solid var(--primary-transparent)', 
            borderRadius: '20px 20px 20px 20px', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* <Row>
                    <h1>
                        Posters
                    </h1>
            </Row> */}
            <Col sm={6} md={4}><div><h1>Posters Coming Soon</h1></div></Col>
            <Col sm={6} md={8}>
            <Image                 
                style={{
                    height: 'auto',
                    padding: '10px',
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
                src="/images/branding/poster_tease.png"
            />
            </Col>
        </div>
    );
}