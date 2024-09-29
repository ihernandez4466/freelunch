import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types';
import { useState } from 'react';

const sweaterPath = "/images/sweaters/";
const stickerPath = "/images/stickers/";
const sweaterExt = "-sweater";

/**
 * Functional component that renders a widget for a product.
 *    @param {ReactNode} props.designName - Name for design png to attach expected to be in /public/images/
 *    @param {ReactNode} props.style - Optional style for the image in case it does not fit as expected
 */
function ProductDiv({ designName, style }) {
    // const stickerExt = "-sticker";
    const sweaterSrc = sweaterPath + designName + sweaterExt + ".png";
    // const stickerSrc = stickerPath + designName + stickerExt + ".png";
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Col xs={12} md={4} className="d-flex justify-content-center mb-3" style={{
            borderRadius: '4px',
            //backgroundColor: 'var(--background)',
        }}>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                            <Image
                                onClick={handleShow}
                                style={style ? style : {
                                    width: '100%',
                                    height: '100%',
                                    padding: '10px',
                                    boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                                    backgroundColor: 'rgb(72, 88, 14, 0.1)',
                                    transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                                src={sweaterSrc}
                            />
                            </Col>
                            <Col>
                            <Form>
                                <Row><h1>$35</h1></Row>
                                <Row><h2>Pick Size</h2></Row>
                                <Row>Sizes</Row>
                                <Row>Add Design</Row>
                                <Row>Designs</Row>
                                <Row>
                                    <Col>
                                    <Form.Select aria-label="Default select example">
                                        <option>Quantity</option>
                                        {[...Array(10)].map((x, i) =>
                                            <option value={i}>{i}</option>)}
                                    </Form.Select>
                                    </Col>
                                    <Col><Button>Add To Cart</Button></Col>
                                </Row>
                            </Form>
                            </Col>
                    </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Image
                onClick={handleShow}
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
                // onMouseEnter={e => {
                //     const imageElement = e.currentTarget;
                //     imageElement.src = stickerSrc;
                // }}
                // onMouseLeave={e => {
                //     e.currentTarget.src = sweaterSrc;
                // }}
            />
        </Col>
    );
}

/**
            </div> <Col>
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
            />
            </Col>
            <Col>
            <Row>$35</Row>
            <Row>Pick Size</Row>
            <Row>Sizes</Row>
            <Row>Add Design</Row>
            <Row>Designs</Row>
            <Row>
                <Col>Quantity</Col>
                <Col>Add to Cart</Col>
            </Row>
            </Col> */
            
/* Functional component that renders sweaters page.*/

export default function Sweaters() {
    
    return (
        <div id="sweaters" style={{
            alignContent: 'center',
            alignItems: 'center',
            height: '80vh',
            padding: '10px 30px 30px 30px'
        }}>
            <Row style={{ padding: '20px' }} className="justify-content-center">
                <Col>
                    <h1 style={{ fontSize: '30px', fontWeight: '600' }}>
                        Apparel
                    </h1>
                    <p style={{ fontSize: '20px', fontWeight: '300' }}>Dive into our first collection of designs that seek to show our brand through apparel. These sweaters are completely customizable upon request</p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <ProductDiv designName="template-grey" />
                <ProductDiv designName="template-brown" />
                <ProductDiv designName="template-red" />
            </Row>
        </div>
    );
}

ProductDiv.prototype = {
    designName: PropTypes.string.isRequired, // name for photo link
    style: PropTypes.object // optional
};