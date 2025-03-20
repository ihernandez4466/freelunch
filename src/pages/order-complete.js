import { Row } from "react-bootstrap";
import CustomNavBar from "../components/navbar";

export default function OrderComplete({ recipient_email, recipient_first }) {
    return (
        <>
        <CustomNavBar showHomeLink={true} showSweatersLink={false} showPostersLink={false} showContactLink={false} showCartLink={false}/>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <h1 className="mb-4 mt-4">Thank you, {recipient_first}. Your Order has been Submitted</h1>
            <Row className="justify-content-center w-50" style={{ padding: '30px', backgroundColor: 'var(--primary-transparent)', borderRadius: '20px 20px 20px 20px', display: 'flex', justifyContent: 'center'}}>
            <p>Your order confirmation has been sent to: <strong>{recipient_email}</strong>.
                Once we receive your order, our team will reach out to you with the next steps to complete your order. 

                We appreciate your understanding as we work to enhance our checkout system and ensure a safe and seamless experience for all our customers.

                If you have any questions or concerns, feel free to contact us at <strong>freelunch707@gmail.com</strong></p>
            </Row>
        </div>
        </>
    )
}