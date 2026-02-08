import { useState } from 'react';
import { Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProductModal from './modals/productModal';

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
    const [size, setSize] = useState(productInfo.available_sizes[0]);
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
            category: e.target.category.value,
            stripe_price_id: e.target.stripe_price_id.value
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
            backgroundColor: 'var(--background)',
        }}>
            <ProductModal
                show={show}
                onHide={handleClose}
                productInfo={productInfo}
                size={size}
                handleSize={handleSize}
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleSubmit={handleSubmit}
                imageStyle={props.style}
            />
            <div>
            <Image
                onClick={handleShow}
                className="product-image"
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
                    ...(props.style ? props.style : {})
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.opacity = '1';
                }}
                src={`${productInfo.img_path}`}
                alt="product"
            />
                <div className="product-info">
                {/* <h3 className="price-text">${productInfo.price}</h3> */}
                <h3 className="name-text">{productInfo.name}</h3>
                </div>
            </div>
        </Col>
    );
}

ProductDiv.prototype = {
    productInfo: PropTypes.object.isRequired, // product details
    style: PropTypes.object // optional
};
