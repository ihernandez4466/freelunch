import { Row } from "react-bootstrap";
import { getCookie, splitCookieValues } from "../components/useCookie";
import { useEffect } from "react";
import CustomNavBar from "../components/navbar";

export default function CheckoutComplete({ customerEmail }){
    // can get the session id from the user id
    const clearCart = async () => {
        const session = getCookie('userId');
        const values = splitCookieValues(session);
        const sessionId = values[0];
        
        const response = await fetch(`/api/cart?userId=${sessionId}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to clear cart: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        if(data && data.rows && data.rows.length > 0) {
            data.rows.forEach(async (item) => {
                const deleteResponse = await fetch(`/api/cart?id=${item.cart_id}`, {
                    method: 'DELETE',
                });
                if (!deleteResponse.ok) {
                    throw new Error('Failed to delete cart item');
                }
            })
        }
    }
    useEffect(() => {
        clearCart();
    }, []);
    return (
        <>
        <CustomNavBar showCart={false} showHomeLink={true} showSweatersLink={false} showPostersLink={false} showContactLink={false} showCartLink={false} />
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
        </>
    )
}