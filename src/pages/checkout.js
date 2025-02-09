import {Row, Col, Image, Modal }from "react-bootstrap"
import { useState } from "react";
import ContactForm from "../components/contact-form";

export default function Checkout({data, handleCheckout}) {
    const [show, setShow] = useState(false);

    const handleContact = (e) => {
        console.log(e.target)
    }
    const handleClose = () => {
        setShow(false);
        handleCheckout(false);
    }

    const renderItems = () => {
        return data.rows.map((product, idx) => (
        <Row key={idx} style={{ borderBottom: '0.5px black solid'}}>
            <Col style={{ margin: '10px 0px 10px 0px'}}>
                <Image style={{
                    padding: '10px',
                    boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                    backgroundColor: 'var(--primary-transparent)',
                    transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
                src={`${product.img_path}`}
                ></Image>
            </Col>
            <Col style={{ margin: '10px 0px 10px 0px'}}>
                <p>{product.name}</p>
                <p>{`price: $${product.price}`}</p>
                <p>{`size: ${product.size}`}</p>
                <p>{`QTY: ${product.quantity}`}</p>
            </Col>
            </Row>))
    }
    
    return (
        <div>
             <Modal centered show={show} onHide={handleClose}>
                <div>
                    {renderItems()}
                </div>
                <ContactForm handleSubmit={handleContact}/>
            </Modal>
        </div>
    )
}