import { Row } from "react-bootstrap";

export default function CheckoutComplete({ customerEmail }){
    // call API to clear cart -> need the cart id -> can get this from session_id
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="mb-4 mt-4 text-center">We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}.</h1>

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
                    If you have any questions or concerns, feel free to contact us at <strong><a href="mailto:freelunch707@gmail.com">freelunch707@gmail.com</a></strong>.
                </p>
                </Row>
            </div>
        </div>
    )
}