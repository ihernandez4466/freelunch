import { useState, useEffect, useRef } from 'react';
import { Button, ButtonGroup, Col, Image, Form, Modal, Row, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import Container from 'react-bootstrap/Container';
import Logo from '../logo';

/** Renders only the first frame of a GIF so it doesn't animate in the thumbnail strip. */
function GifStaticThumbnail({ gifSrc, style }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        const img = new window.Image();
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            img.src = '';
        };
        img.src = gifSrc;
        return () => { img.src = ''; };
    }, [gifSrc]);
    return (
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '1', ...style }}
        />
    );
}

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
    // // Generate 4 image paths (for now using the same image, but can be extended to use productInfo.images array if available)
    const imagePaths = [
        productInfo.img_path,
        // 'images/sweaters/thumbnails/sweater-black-front.jpg',
        'images/sweaters/thumbnails/sweater-black-functionality.MOV.gif',
        'images/sweaters/thumbnails/sweater-black-front-usage.png',
        'images/sweaters/thumbnails/sweater-black-back-real.png'
        // 'images/sweaters/thumbnails/sweater-black-velcrow.jpg',
    ];
    
    const [selectedImage, setSelectedImage] = useState(imagePaths[0]);

    // For GIFs in thumbnails: show only first frame (canvas) so they don't animate. Main area still shows full GIF when selected.
    const isGif = (path) => typeof path === 'string' && path.toLowerCase().endsWith('.gif');

    return (
        <Modal data-bs-theme="dark" centered show={show} onHide={onHide} fullscreen contentClassName="d-flex flex-column h-100 product-modal">
            <Form
                id={`${productInfo.id}-form`}
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    minHeight: 0,
                    overflow: 'hidden',
                }}
            >
                <Modal.Header closeButton className="d-flex align-items-center">
                    <Logo />
                </Modal.Header>
                <Modal.Body
                    style={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Row className="flex-grow-1">
                        {/* Column 1: xs centered, md+ aligned at end (right) */}
                        <Col xs={12} md={6} className="d-flex flex-column align-items-center align-items-md-end justify-content-center">
                            <div className="d-flex flex-column align-items-center align-items-md-end">
                                {/* Row 1: Primary image */}
                                <Row xs={9} md={9} className="w-100" style={{ borderBottom: '1px solid var(--primary)' }}>
                                <Image
                                    src={selectedImage}
                                    style={{
                                        width: '450px',
                                        height: '400px',
                                        objectFit: 'contain',
                                        backgroundColor: 'white'                                    
                                    }}
                                />
                                </Row>
                                {/* Row 2: Thumbnails – single row, horizontal scroll if many */}
                                {/* <div className="d-flex flex-nowrap overflow-x-auto gap-2 justify-content-center product-modal-thumbnail-strip" 
                                style={{ minHeight: 0, paddingTop: '10px', width: '100%' }}>
                                    {imagePaths.map((imgPath, index) => (
                                        <div
                                            key={index}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => setSelectedImage(imgPath)}
                                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedImage(imgPath); } }}
                                            style={{
                                                width: '80px',
                                                backgroundColor: 'white',
                                                cursor: 'pointer',
                                                // border: selectedImage === imgPath ? '3px solid var(--primary)' : '3px solid transparent',
                                                borderRadius: '4px',
                                                opacity: selectedImage === imgPath ? 1 : 0.85,
                                            }}
                                        >
                                            {isGif(imgPath) ? (
                                                <GifStaticThumbnail
                                                    gifSrc={imgPath}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '1' }}
                                                />
                                            ) : (
                                                <Image
                                                    src={imgPath}
                                                    alt=""
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        aspectRatio: '1',
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div> */}
                            </div>
                        </Col>
                        {/* Column 2: xs centered, md+ aligned at start (left) */}
                        <Col xs={12} md={6} className="d-flex flex-column align-items-center align-items-md-start justify-content-center">
                            <div className="w-100 text-center text-md-start" style={{ maxWidth: '90%' }}>
                            <Row key={`${productInfo.id}-name`} className="justify-content-center justify-content-md-start">
                                <input type="hidden" name="product" value={productInfo.id} />
                                <input type="hidden" name="category" value={productInfo.category} />
                                <input type="hidden" name="stripe_price_id" value={productInfo.stripe_price_id} />
                                <h1>{`$${productInfo.price}`}</h1>
                                <h1>{`${productInfo.name}`}</h1>
                                <input type="hidden" name="price" value={productInfo.price} />
                            </Row>
                            <Row className="justify-content-center justify-content-md-start">
                                <Form.Label htmlFor="sizeInput" key={`${productInfo.id}-size`}>Pick Size</Form.Label>
                                <ToggleButtonGroup id="sizeInput" className="product-modal-info-row" name="size" type="radio" value={size}
                                    onChange={handleSize} style={{ paddingBottom: '15px'}}>
                                    {productInfo.available_sizes.map((size, i) => 
                                        <ToggleButton size="sm" className="btn-neutral" id={`size-${i}`} value={size} key={`size-${i}`}>{size.toUpperCase()}</ToggleButton>
                                    )}
                                </ToggleButtonGroup>
                            </Row>
                            <Row className="justify-content-center justify-content-md-start">
                                <ButtonGroup className="d-inline-flex product-modal-info-row">
                                    <input type="hidden" name="quantity" value={quantity} />
                                    <Button size="sm" style={{backgroundColor: 'var(--primary)', borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px'}} disabled={quantity <= 1} onClick={() => handleQuantity("subtract")}><GrSubtractCircle/></Button>
                                    <Button size="sm" style={{backgroundColor: 'var(--primary)'}} disabled>{`QTY: ${quantity}`}</Button>
                                    <Button size="sm" style={{backgroundColor: 'var(--primary)', borderTopRightRadius: '25px', borderBottomRightRadius: '25px'}} disabled={quantity >= productInfo.available_quantity} onClick={() => handleQuantity("add")}><IoIosAddCircleOutline /></Button>
                                </ButtonGroup>
                            </Row>
                            <Row style={{ padding: '10px' }} className="justify-content-center justify-content-md-start">
                                <Button size="sm" className="btn-neutral product-modal-info-row" type="submit">
                                    Add To Cart
                                </Button>
                            </Row>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Form>
        </Modal>
    );
}