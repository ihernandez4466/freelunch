import { Row } from "react-bootstrap";

export default function CheckoutComplete(){
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="mb-4 mt-4 text-center">Thank you, Your Order has been Submitted</h1>

            <div className="w-100 d-flex justify-content-center">
                <Row className="w-75" style={{
                padding: '30px',
                backgroundColor: 'var(--background)',
                borderRadius: '20px',
                }}>
                <p>
                    Once we receive your order, our team will reach out to you with the next steps to complete your order.
                    <br /><br />
                    We appreciate your understanding as we work to enhance our checkout system and ensure a safe and seamless experience for all our customers.
                    <br /><br />
                    If you have any questions or concerns, feel free to contact us at <strong>freelunch707@gmail.com</strong>
                </p>
                </Row>
            </div>
        </div>
    )
}