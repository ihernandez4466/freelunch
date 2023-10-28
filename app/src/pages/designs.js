import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const HOST = process.env.HOST;
const imagePath = HOST + '/images/sweaters'
const images = [
    `${imagePath}/betty-strongService-sweater.png`,
    `${imagePath}/betty-strongService.png`,
    `${imagePath}/relentless.png`,
    `${imagePath}/relentless-sweater-white.png`,
    `${imagePath}/betty-icy-sweater.png`,
    `${imagePath}/betty-icy.png`,
    `${imagePath}/cake-sweater.png`,
    `${imagePath}/cake.png`,
    `${imagePath}/betty-horn-sweater-white.png`,
    `${imagePath}/betty-horn.png`,
    `${imagePath}/betty-bearliving-sweater.png`,
    `${imagePath}/betty-bearliving.png`,
    `${imagePath}/betty-relentless-sweater-white.png`,
    `${imagePath}/betty-relentless.png`
]

export function Designs() {

    return (
        <>
        <div id="designs" >
        <Row style={{ marginTop: '10%', padding: '20px'}}>
            <Col xs={4}>
                <h1 style={{ display: 'block', fontSize: '50px'}}>
                    Designs and Apparel
                </h1>
                <p style={{ display: 'block', fontSize: '25px'}}>Dive into our first collection of designs that seek to show our brand through apparel. All of the following are available in a sweater or sticker and are completely customizable upon request</p>
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
                        src={images[0]}
                        onMouseEnter={e => {
                            const imageElement = e.currentTarget; 
                            imageElement.src = images[1];
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.src = images[0]
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
                        src={images[2]}
                        onMouseEnter={e => {
                            const imageElement = e.currentTarget; 
                            imageElement.src = images[3];
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.src = images[2];
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
                            src={images[4]}
                            onMouseEnter={e => {
                                e.currentTarget.src = images[5];
                            }}
                            onMouseLeave={e => {
                                
                                e.currentTarget.src = images[4];
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
                        src={images[6]}
                        onMouseEnter={e => {
                                e.currentTarget.src = images[7];
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = images[6];
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
                            src={images[8]}
                            onMouseEnter={e => {
                                e.currentTarget.src = images[9];
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = images[8];
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
                            src={images[10]}
                            onMouseEnter={e => {
                                e.currentTarget.src = images[11];
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = images[10];
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
                            src={images[12]}
                            onMouseEnter={e => {
                                e.currentTarget.src = images[13];
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.src = images[12];
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