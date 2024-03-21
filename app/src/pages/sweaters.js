import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

const hostUrl = process.env.VERCEL_URL;
const sweaterPath = "/images/sweaters/";
const stickerPath = "/images/stickers/";

function SweaterDiv({ designName, style }) {
    const stickerExt = "-sticker";
    const sweaterExt = "-sweater";
    const sweaterSrc = hostUrl + sweaterPath + designName + sweaterExt + ".png";
    const stickerSrc = hostUrl + stickerPath + designName + stickerExt + ".png";

    return (
        <Col xs={12} md={4} className="d-flex justify-content-center mb-3" style={{ 
            borderRadius:'4px', 
            //backgroundColor: 'var(--background)',
        }}>
            <Image
                style={ style ? style : { 
                    width:'350px', 
                    height:'300px', 
                    padding: '10px', 
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}                                                                                            
                src={sweaterSrc}
                onMouseEnter={e => {
                    const imageElement = e.currentTarget; 
                    imageElement.src = stickerSrc;
                }}
                onMouseLeave={e => {
                    e.currentTarget.src = sweaterSrc;
                }}
                />
            </Col>
        );
    }

export default function Sweaters() {

    return (
        <div id="sweaters">
            <Row style={{ marginTop: '10%', padding: '20px'}} className="justify-content-center">
                <Col>
                    <h1 style={{ display: 'block', fontSize: '30px', fontWeight: '600'}}>
                        Apparel
                    </h1>
                    <p style={{ display: 'block', fontSize: '20px', fontWeight: '300'}}>Dive into our first collection of designs that seek to show our brand through apparel. These sweaters are completely customizable upon request</p>
                </Col>
                <SweaterDiv designName="betty-bearliving" />
                <SweaterDiv designName="betty-icy" />
            </Row>
            <Row className="justify-content-center">
                <SweaterDiv designName="betty-strongService" />
                <SweaterDiv designName="cake" />
                <SweaterDiv designName="relentless" />
            </Row>
        </div>
    );
}

SweaterDiv.prototype = {
    designName: PropTypes.string.isRequired,
    style: PropTypes.object // optional
};