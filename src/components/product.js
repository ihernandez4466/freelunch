import { useState } from 'react';
import { Button, ButtonGroup, Col, Container, Image, Form, Modal, Row, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";

/**
 * Functional component that renders a widget for a product.
 *    @param {ReactNode} props.productInfo - product object with name: str, img_path: str, price: int, description: str, available_qty: int, available_sizes: array
 *    @param {ReactNode} props.style - Optional style for the image in case it does not fit as expected
 */
export default function ProductDiv({ productInfo, successSetter, ...props }) {
    const user = props.userId
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [size, setSize] = useState(['S']);
    const [quantity, setQuantity] = useState(1);

    const handleSize = (val) => {
        console.log(`changing value to :${val}`);
        setSize(val);
    }

    const handleQuantity = (action) => {
        if (action === "add") {
            setQuantity(quantity + 1);
        } else if (action === "subtract") {
            setQuantity(quantity - 1);
        }
  };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
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
            console.log(data);
            const response = await fetch('/api/cart', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form")             
            }

            const result = await response.json();
            console.log(`Form submitted successfully: ${result}`);
            successSetter(true, "Product Added to Cart")
        } catch (error) {
            console.error('Error submitting form:', error);
            successSetter(false, "Unable to add Product to Cart")
        } finally {
            handleClose() // hide modal
        }
    }

    return (
        <Col xs={12} md={4} className="d-flex justify-content-center mb-3 overflow-hidden" style={{
            borderRadius: '4px',
            //backgroundColor: 'var(--background)',
        }}>
            <Modal centered show={show} onHide={handleClose}>
            <Form id={`${productInfo.id}-form`} onSubmit={handleSubmit}>
                <Modal.Header style={{ borderBottom: 'none'}} closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md={6}>
                            <Image
                                onClick={handleShow}
                                style={props.style ? props.style : {
                                    height: 'auto',
                                    padding: '10px',
                                    boxShadow: '5px 5px 5px 5px rgb(190, 187, 187, 0.5)',
                                    backgroundColor: 'white',
                                    transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                                src={`${productInfo.img_path}`}
                            />
                            </Col>
                            <Col md={6}>
                                <Row inline key={`${productInfo.id}-name`}>
                                    <input type="hidden" name="product" value={productInfo.id} />
                                    <input type="hidden" name="category" value={productInfo.category} />
                                    <h2>{`$${productInfo.price} ${productInfo.name}`}</h2>
                                    <input type="hidden" name="price" value={productInfo.price} />
                                </Row>                                
                                <Row>
                                    <Form.Label htmlFor="sizeInput" key={`${productInfo.id}-size`}>Pick Size</Form.Label>
                                    <ToggleButtonGroup id="sizeInput" name="size" type="radio" value={size}
                                        onChange={handleSize} style={{ paddingBottom: '15px'}}>
                                    {productInfo.available_sizes.map((size, i) => 
                                        <ToggleButton size="sm" className="btn-neutral" id={`size-${i}`} value={size}>{size}</ToggleButton>)}                                
                                    </ToggleButtonGroup>
                                </Row>
                                <Col>
                                    <ButtonGroup className="d-inline-flex">
                                        <input type="hidden" name="quantity" value={quantity} />
                                        <Button size="sm" style={{backgroundColor: 'var(--primary', borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px'}} disabled={quantity <= 1} onClick={() => handleQuantity("subtract")}><GrSubtractCircle /></Button>
                                        <Button size="sm" style={{backgroundColor: 'var(--primary'}} disabled>{`QTY: ${quantity}`}</Button>
                                        <Button size="sm" style={{backgroundColor: 'var(--primary'}} disabled={quantity >= productInfo.available_quantity} onClick={() => handleQuantity("add")}><IoIosAddCircleOutline /></Button>
                                    </ButtonGroup>
                                </Col>
                                <Row style={{ margin: '1rem 0rem 1rem 0rem'}}>
                                    <Button size="sm" className="btn-neutral" type="submit">Add To Cart</Button>
                                </Row>
                            </Col>
                    </Row>
                   
                    </Container>
                </Modal.Body>
                </Form>
            </Modal>
            <div style={{ padding: '0px 0px 5px 0px'}}>
            {/* <div> */}
            <Image
                onClick={handleShow}
                style={props.style ? props.style : {
                    // width: '50%',
                    height: 'auto',
                    objectFit: 'cover',
                    boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                    // backgroundColor: 'var(--primary-transparent)',
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                    maxWidth: '100%',
                    // maxHeight: '100%',
                }}
                src={`${productInfo.img_path}`}
            />
                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', paddingTop: '10px'}}>
                <p style={{ textAlign: 'center', fontSize: 'large'}}>${productInfo.price}</p>
                <p style={{ textAlign: 'center', paddingLeft: '5px', fontSize: 'large'}}>{productInfo.name}</p>
                </div>
            </div>
        </Col>
    );
}

ProductDiv.prototype = {
    productInfo: PropTypes.object.isRequired, // product details
    style: PropTypes.object // optional
};
