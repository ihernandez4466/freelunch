import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function Designs() {

    return (
        <>
        <div id="designs" >
        <Row style={{ marginTop: '10%', padding: '20px'}}>
            <Col>
                <h1 style={{ display: 'block', fontSize: '50px'}}>
                    Designs and Apparel
                </h1>
                <p style={{ display: 'block', fontSize: '25px'}}>Dive into our first collection of designs that seek to show our brand through apparel. These sweaters and/or stickers are completely customizable upon request</p>
            </Col>
            <Col style={{ 
                borderRadius:'4px', 
                backgroundColor: 'var(--background)',
                }}>
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
                        src='http://localhost:3000/images/sweaters/betty-bearliving-sweater.png'
                        onMouseEnter={e => {
                            const imageElement = e.currentTarget; 
                            imageElement.src = "http://localhost:3000/images/sweaters/betty-bearliving.png";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.src = "http://localhost:3000/images/sweaters/betty-bearliving-sweater.png";
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
                        src='http://localhost:3000/images/sweaters/betty-icy-sweater.png'
                        onMouseEnter={e => {
                            const imageElement = e.currentTarget; 
                            imageElement.src = 'http://localhost:3000/images/sweaters/betty-icy.png';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.src = "http://localhost:3000/images/sweaters/betty-icy-sweater.png";
                        }}
                        />
                </Col>
            </Row>
            <Row>
                <Col style={{ /*width: '100%'*/}}>
                        <Image
                        style={{ 
                            width:'100%',
                            padding: '30px',
                            boxShadow: '10px 10px 10px var(--bs-dark-border-subtle)' 
                            }}
                            src='http://localhost:3000/images/sweaters/relentless-sweater-white.png'
                            onMouseEnter={e => {
                                e.currentTarget.src = "http://localhost:3000/images/sweaters/relentless.png";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = 'http://localhost:3000/images/sweaters/relentless-sweater-white.png';
                            }}
                            />
                </Col>
                <Col d-flex justify-content-center align-items-center style={{ /*width: '100%'*/}}>
                        <Image
                        style={{ 
                            width:'400px',
                            marginTop: '20px',
                            padding: '30px',
                            boxShadow: '10px 10px 10px var(--bs-dark-border-subtle)' 
                            }}
                            src='http://localhost:3000/images/sweaters/betty-horn-sweater-white.png'
                            onMouseEnter={e => {
                                e.currentTarget.src = "http://localhost:3000/images/sweaters/betty-horn.png";
                            }}
                            onMouseLeave={e => {
                                
                                e.currentTarget.src = "http://localhost:3000/images/sweaters/betty-horn-sweater-white.png";
                            }}
                            />
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
                        src='http://localhost:3000/images/sweaters/betty-strongService-sweater.png'
                        onMouseEnter={e => {
                                e.currentTarget.src = "http://localhost:3000/images/sweaters/betty-strongService.png";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = "http://localhost:3000/images/sweaters/betty-strongService-sweater.png";
                        }}/>
            </Col>
            <Col xs={8} style={{ 
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
                            src='http://localhost:3000/images/sweaters/cake-sweater.png'
                            onMouseEnter={e => {
                                e.currentTarget.src = "http://localhost:3000/images/sweaters/cake-sticker.png";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = "http://localhost:3000/images/sweaters/cake-sweater.png";
                            }}
                        />
                </Col>
        </Row>
        </div>
        </>
    );
}