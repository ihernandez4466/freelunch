import { useState } from 'react';
import { Button, ButtonGroup, Col, Container, Image, Form, Modal, Row, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";

export default function ProductModal({ 
    show, 
    onHide, 
    productInfo, 
    size, 
    handleSize, 
    quantity, 
    handleQuantity, 
    handleSubmit,
    imageStyle 
}) {
    // Generate 4 image paths (for now using the same image, but can be extended to use productInfo.images array if available)
    const imagePaths = productInfo.images || [
        productInfo.img_path,
        productInfo.img_path,
        productInfo.img_path,
        productInfo.img_path
    ];
    
    const [selectedImage, setSelectedImage] = useState(imagePaths[0]);

    return (
        <Modal centered show={show} onHide={onHide} fullscreen>
            <Form id={`${productInfo.id}-form`} onSubmit={handleSubmit}>
                <Modal.Header style={{ borderBottom: 'none'}} closeButton>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    <Container fluid style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                        <Row style={{ flex: 1, minHeight: '60vh', marginBottom: 0 }} className="align-items-stretch">
                            {/* Column 1: Thumbnails */}
                            <Col xs={12} md={4} lg={3} className="d-flex flex-column gap-2 mt-3 mt-md-0" style={{ minHeight: '50vh', maxHeight: '70vh' }}>
                                {imagePaths.map((imgPath, index) => (
                                    <Image
                                        key={index}
                                        className="product-image-thumbnail"
                                        style={{
                                            flex: 1,
                                            minHeight: 0,
                                            width: '100%',
                                            cursor: 'pointer',
                                            border: selectedImage === imgPath ? '3px solid var(--primary)' : '3px solid transparent',
                                            borderRadius: '4px',
                                            transition: 'all 0.2s ease-in-out',
                                            opacity: selectedImage === imgPath ? 1 : 0.7,
                                            objectFit: 'cover'
                                        }}
                                        src={imgPath}
                                        onClick={() => setSelectedImage(imgPath)}
                                        onMouseEnter={(e) => {
                                            if (selectedImage !== imgPath) {
                                                e.target.style.opacity = '0.9';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (selectedImage !== imgPath) {
                                                e.target.style.opacity = '0.7';
                                            }
                                        }}
                                    />
                                ))}
                            </Col>
                            {/* Column 2: Primary image */}
                            <Col xs={12} md={8} lg={5} className="d-flex justify-content-center align-items-center mt-3 mt-md-0" style={{ minHeight: '50vh', maxHeight: '70vh' }}>
                                <Image
                                    className="product-image"
                                    style={{
                                        maxWidth: '100%',
                                        width: '100%',
                                        maxHeight: '70vh',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        ...(imageStyle || {})
                                    }}
                                    src={selectedImage}
                                />
                            </Col>
                            {/* Column 3: Product info (visible as third column on lg, full width below on smaller) */}
                            <Col xs={12} lg={4} className="mt-4 mt-lg-0 d-flex flex-column justify-content-center">
                                <Row inline key={`${productInfo.id}-name`}>
                                    <input type="hidden" name="product" value={productInfo.id} />
                                    <input type="hidden" name="category" value={productInfo.category} />
                                    <input type="hidden" name="stripe_price_id" value={productInfo.stripe_price_id} />
                                    <h1>{`$${productInfo.price}`}</h1>
                                    <h1>{`${productInfo.name}`}</h1>
                                    <input type="hidden" name="price" value={productInfo.price} />
                                </Row>
                                <Row>
                                    <Form.Label htmlFor="sizeInput" key={`${productInfo.id}-size`}>Pick Size</Form.Label>
                                    <ToggleButtonGroup id="sizeInput" name="size" type="radio" value={size}
                                        onChange={handleSize} style={{ paddingBottom: '15px'}}>
                                        {productInfo.available_sizes.map((size, i) => 
                                            <ToggleButton size="sm" className="btn-neutral" id={`size-${i}`} value={size} key={`size-${i}`}>{size.toUpperCase()}</ToggleButton>
                                        )}
                                    </ToggleButtonGroup>
                                </Row>
                                <Row>
                                    <ButtonGroup className="d-inline-flex">
                                        <input type="hidden" name="quantity" value={quantity} />
                                        <Button size="sm" style={{backgroundColor: 'var(--primary)', borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px'}} disabled={quantity <= 1} onClick={() => handleQuantity("subtract")}><GrSubtractCircle/></Button>
                                        <Button size="sm" style={{backgroundColor: 'var(--primary)'}} disabled>{`QTY: ${quantity}`}</Button>
                                        <Button size="sm" style={{backgroundColor: 'var(--primary)', borderTopRightRadius: '25px', borderBottomRightRadius: '25px'}} disabled={quantity >= productInfo.available_quantity} onClick={() => handleQuantity("add")}><IoIosAddCircleOutline /></Button>
                                    </ButtonGroup>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Row className="w-100 d-flex justify-content-center my-3">
                        <Button size="sm" className="btn-neutral" type="submit">
                            Add To Cart
                        </Button>
                    </Row>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
