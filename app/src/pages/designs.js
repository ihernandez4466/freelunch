import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function Designs() {

    return (
        <>
        <div id="designs" >
        <Row style={{ marginTop: '10%', padding: '20px'}}>
            <Col xs={4}>
                <h1 style={{ display: 'block', fontSize: '50px'}}>
                    Designs and Apparel
                </h1>
                <p style={{ display: 'block', fontSize: '25px'}}>Dive into our first collection of designs that seek to show our brand through apparel. These sweaters and/or stickers are completely customizable upon request</p>
            </Col>
            <Col xs={8} style={{ 
                borderRadius:'4px', 
                backgroundColor: 'var(--background)',
                }}>
                <Row xs={8}>
                    <Col d-flex justify-content-center align-items-center
                    style={{ width: '350px', height: '300px' }}>
                    <Image
                        style={{ 
                            width:'350px', 
                            height:'300px', 
                            padding: '10px', 
                            boxShadow: '-10px 10px 10px var(--bs-dark-border-subtle)',
                            transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}                                                                                            
                        src='http://localhost:3000/images/design2-sweater.png'
                        onMouseEnter={e => {
                            const imageElement = e.currentTarget; 
                            imageElement.src = "http://localhost:3000/images/design2-transparent.png";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.src = "http://localhost:3000/images/design2-sweater.png";
                        }}
                        />
                    </Col>
                    <Col d-flex justify-content-center align-items-center
                    style={{ width: '350px', height: '300px' }}>
                    <Image
                        style={{ 
                            width:'350px', 
                            height:'300px', 
                            padding: '10px', 
                            boxShadow: '-10px 10px 10px var(--bs-dark-border-subtle)',
                            transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}                                                                                            
                        src='http://localhost:3000/images/design1-sweater.png'
                        onMouseEnter={e => {
                            const imageElement = e.currentTarget; 
                            imageElement.src = "http://localhost:3000/images/design1-sticker.png";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.src = "http://localhost:3000/images/design1-sweater.png";
                        }}
                        />
                    </Col>
                </Row>
                <Row xs={4}>
                    <Col d-flex justify-content-center align-items-center style={{ width: '100%'}}>
                        <Image
                        style={{ 
                            width:'400px',
                            marginTop: '20px',
                            padding: '30px',
                            boxShadow: '10px 10px 10px var(--bs-dark-border-subtle)' 
                            }}
                            src='http://localhost:3000/images/design11-sweater.png'
                            onMouseEnter={e => {
                                e.currentTarget.src = "http://localhost:3000/images/design11.png";
                            }}
                            onMouseLeave={e => {
                                
                                e.currentTarget.src = "http://localhost:3000/images/design11-sweater.png";
                            }}
                            />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col xs={4} style={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap'}}>
                <Image
                    style={{ 
                        width:'100%',
                        padding: '10px',
                        boxShadow: '-10px 10px 10px var(--bs-dark-border-subtle)' 
                        }}
                        src='http://localhost:3000/images/design3-sweater.png'
                        onMouseEnter={e => {
                                e.currentTarget.src = "http://localhost:3000/images/design3-sticker.png";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = "http://localhost:3000/images/design3-sweater.png";
                        }}/>
            </Col>
            <Col xs={8} 
                style={{ 
                    borderRadius:'4px', 
                    //backgroundColor: 'var(--background)',
                    //boxShadow: '-10px 10px 10px var(--bs-dark-border-subtle' 
                }}>
                <Row xs={8}>
                    <Col style={{ 
                        display: 'inline-grid',
                        alignContent: 'center',
                        alignItems: 'flex-end'
                        }}>
                        <Image
                        style={{ 
                            width:'100%',
                            height: '100%',
                            padding: '10px',
                            boxShadow: '-10px 10px 10px var(--bs-dark-border-subtle)' 
                            }}
                            src='http://localhost:3000/images/design4-sweater.png'
                            onMouseEnter={e => {
                                e.currentTarget.src = "http://localhost:3000/images/design4.png";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = "http://localhost:3000/images/design4-sweater.png";
                            }}
                        />
                    </Col>
                    <Col>
                        <Image
                            style={{ 
                            width:'100%',
                            padding: '10px',
                            boxShadow: '-10px 10px 10px var(--bs-dark-border-subtle)' 
                            }}
                            src='http://localhost:3000/images/design5-sweater.png'
                            onMouseEnter={e => {
                                e.currentTarget.src = "http://localhost:3000/images/design5.png";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = "http://localhost:3000/images/design5-sweater.png";
                            }}
                            />
                    </Col>
                </Row>
                <Row xs={4}>
                    <Col style={{ width: '100%'}}>
                        <Image
                        style={{ 
                            width:'100%',
                            padding: '30px',
                            boxShadow: '10px 10px 10px var(--bs-dark-border-subtle)' 
                            }}
                            src='http://localhost:3000/images/design7-sweater.png'
                            onMouseEnter={e => {
                                e.currentTarget.src = "http://localhost:3000/images/design7.png";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = "http://localhost:3000/images/design7-sweater.png";
                            }}
                            />
                    </Col>
                </Row>
            </Col>
        </Row>
        </div>
        </>
    );
}