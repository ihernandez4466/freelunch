import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types';
import { useState } from 'react';
import SweaterMockData from '../mock_data/sweaters.json';

/**
 * Functional component that renders a widget for a product.
 *    @param {ReactNode} props.productInfo - product object with name: str, img_path: str, price: int, description: str, available_qty: int, available_sizes: array
 *    @param {ReactNode} props.style - Optional style for the image in case it does not fit as expected
 */
function ProductDiv({ productInfo, style }) {
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
                                src={productInfo.img_path}
                            />
                            </Col>
                            <Col>
                            <Form>
                                <Row><h1>{productInfo.price}</h1></Row>
                                <Row><h2>Pick Size</h2></Row>
                                <Row>{productInfo.available_sizes.map((size, i) => 
                                <Col value={i}>{size}</Col>)}</Row>
                                <Row>
                                    <Col>
                                    <Form.Select aria-label="Default select example">
                                        <option>Quantity</option>
                                        {[...Array(productInfo.available_qty)].map((x, i) =>
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
                src={productInfo.img_path}
            />
        </Col>
    );
}

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
                {SweaterMockData.map(item => (
                    <ProductDiv productInfo={item} />))}
            </Row>
        </div>
    );
}

ProductDiv.prototype = {
    productInfo: PropTypes.object.isRequired, // product details
    style: PropTypes.object // optional
};