import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

const sweaterPath = "/images/sweaters/";
const stickerPath = "/images/stickers/";


/**
 * Functional component that renders a widget for a product.
 *    @param {ReactNode} props.designName - Name for design png to attach expected to be in /public/images/
 *    @param {ReactNode} props.style - Optional style for the image in case it does not fit as expected
 */
function ProductDiv({ designName, style }) {
    const stickerExt = "-sticker";
    const sweaterExt = "-sweater-attachment";
    const sweaterSrc = sweaterPath + designName + sweaterExt + ".png";
    const stickerSrc = stickerPath + designName + stickerExt + ".png";

    return (
        <Col xs={12} md={4} className="d-flex justify-content-center mb-3" style={{
            borderRadius: '4px',
            //backgroundColor: 'var(--background)',
        }}>
            <Image
                style={style ? style : {
                    width: '350px',
                    height: '300px',
                    padding: '10px',
                    boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                    backgroundColor: 'rgb(72, 88, 14, 0.1)',
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

/**
 * Functional component that renders a pop up widget when a design is selected (NOT DONE)
 *    @param {ReactNode} props.designName - Name for design png to attach expected to be in /public/images/
 */
function sweaterOptions({ designName }) {
    const stickerExt = "-sticker";
    const sweaterExt = "-sweater";
    const attachmentExt = "-attachment";
    const sweaterSrc = sweaterPath + designName + sweaterExt + ".png";
    const sweaterAttachmentSrc = sweaterPath + designName + sweaterExt + attachmentExt + ".png";
    const stickerSrc = stickerPath + designName + stickerExt + ".png";
    return (
        <div>
            <Col md={3}>
                <Row>
                    <img src={sweaterAttachmentSrc}></img>
                </Row>
                <Row>
                    <img src={sweaterSrc}></img>
                </Row>
                <Row>
                    <img src={stickerSrc}></img>
                </Row>
            </Col>
            <Col md={9}>
                <img src={sweaterAttachmentSrc}></img>
            </Col>
        </div>
    );
}

/* Functional component that renders sweaters page.*/

export default function Sweaters() {

    return (
        <div id="sweaters">
            <Row style={{ padding: '20px' }} className="justify-content-center">
                <Col>
                    <h1 style={{ display: 'block', fontSize: '30px', fontWeight: '600' }}>
                        Apparel
                    </h1>
                    <p style={{ display: 'block', fontSize: '20px', fontWeight: '300' }}>Dive into our first collection of designs that seek to show our brand through apparel. These sweaters are completely customizable upon request</p>
                </Col>
                <ProductDiv designName="betty-bearliving" />
                <ProductDiv designName="betty-icy" />
            </Row>
            <Row className="justify-content-center">
                <ProductDiv designName="betty-strongService" />
                <ProductDiv designName="cake" />
                <ProductDiv designName="relentless" />
            </Row>
        </div>
    );
}

ProductDiv.prototype = {
    designName: PropTypes.string.isRequired, // name for photo link
    style: PropTypes.object // optional
};