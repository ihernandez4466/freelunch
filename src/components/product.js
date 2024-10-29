import { useState } from 'react';
import { Button, Col, Container, Image, Form, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Loading from '../components/loading'

/**
 * Functional component that renders a widget for a product.
 *    @param {ReactNode} props.productInfo - product object with name: str, img_path: str, price: int, description: str, available_qty: int, available_sizes: array
 *    @param {ReactNode} props.style - Optional style for the image in case it does not fit as expected
 */
export default function ProductDiv({ productInfo, ...props }) {
    const user = props.userId
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleSubmit = async (e) => {
    
        //e.preventDefault();
        // add this to the cart :)
        const data = {
            userId: user,
            productId: e.target.product.value,
            size: e.target.size.value,
            price: e.target.price.value,
            quantity: e.target.quantity.value,
            category: e.target.category.value
        }
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form")             
            }

            const result = await response.json();
            console.log('Form submitted successfully:', result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

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
                                style={props.style ? props.style : {
                                    width: '100%',
                                    height: '100%',
                                    padding: '10px',
                                    boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                                    backgroundColor: 'rgb(72, 88, 14, 0.1)',
                                    transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                                src={`/images/${productInfo.img_path}`}
                            />
                            </Col>
                            <Col>
                            <Form id={`${productInfo.id}-form`} onSubmit={handleSubmit}>
                                <Row key={`${productInfo.id}-name`}>
                                    <input type="hidden" name="product" value={productInfo.id} />
                                    <input type="hidden" name="category" value={productInfo.category} />
                                    <h1>{productInfo.name}</h1>
                                </Row>                                
                                <Row key={`${productInfo.id}-price`}>
                                    <input type="hidden" name="price" value={productInfo.price} />
                                    <h1>{productInfo.price}</h1>
                                </Row>
                                <Row key={`${productInfo.id}-size`}><h2>Pick Size</h2></Row>
                                <Row key={`${productInfo.id}-availableSizes`}>{productInfo.available_sizes.map((size, i) => 
                                    <Form.Check key={`size-${i}`} inline label={size} value={size} name="size" type="radio"/>)}</Row>
                                <Row key={`${productInfo.id}-quantity`}>
                                    <Col>
                                    <Form.Select name="quantity" aria-label="Default select example">
                                        <option value="">Quantity</option>
                                        {[...Array(productInfo.available_quantity)].map((x, i) =>
                                            <option key={`${productInfo.id}-quantity-${i+1}`} value={i+1}>{i+1}</option>)}
                                    </Form.Select>
                                    </Col>
                                    <Col><Button type="submit">Add To Cart</Button></Col>
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
                style={props.style ? props.style : {
                    width: '350px',
                    height: '300px',
                    padding: '10px',
                    boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                    backgroundColor: 'rgb(72, 88, 14, 0.1)',
                    transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
                src={`/images/${productInfo.img_path}`}
            />
        </Col>
    );
}

ProductDiv.prototype = {
    productInfo: PropTypes.object.isRequired, // product details
    style: PropTypes.object // optional
};
