import { Row } from "react-bootstrap";
import { getCookie, splitCookieValues } from "../components/useCookie";
import { useEffect, useCallback } from "react";
import CustomNavBar from "../components/navbar";

export default function CheckoutComplete({ customerEmail }){
    // can get the session id from the user id
    const getCartDataAndClear = async () => {
        const session = getCookie('userId');
        const values = splitCookieValues(session);
        const sessionId = values[0];
        
        const response = await fetch(`/api/cart?userId=${sessionId}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get cart: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        const cartItems = data && data.rows ? data.rows : [];
        
        // Clear cart items if they exist
        if(cartItems.length > 0) {
            await Promise.all(cartItems.map(async (item) => {
                const deleteResponse = await fetch(`/api/cart?id=${item.cart_id}`, {
                    method: 'DELETE',
                });
                if (!deleteResponse.ok) {
                    throw new Error('Failed to delete cart item');
                }
            }));
        }
        
        return { cartItems, sessionId };
    }
    const sendConfirmationEmail = useCallback(async (cartItems, sessionId) => {
        if (!cartItems || cartItems.length === 0) {
            console.log('No items in cart, skipping confirmation email');
            return;
        }
        
        try {
            // Calculate order total from cart items
            const orderTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            const response = await fetch('/api/order-confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_email: customerEmail,
                    session_id: sessionId,
                    customer_order: cartItems,
                    order_total: orderTotal
                })
            });
            
            if (!response.ok) {
                throw new Error(`Failed to send confirmation email: ${response.status}`);
            }
            
            console.log('Confirmation email sent successfully');
        } catch (error) {
            console.error('Error sending confirmation email:', error);
        }
    }, [customerEmail]);
    
    useEffect(() => {
        const handleCheckoutComplete = async () => {
            try {
                const { cartItems, sessionId } = await getCartDataAndClear();
                await sendConfirmationEmail(cartItems, sessionId);
            } catch (error) {
                console.error('Error during checkout completion:', error);
            }
        };
        
        handleCheckoutComplete();
    }, [sendConfirmationEmail]);
    return (
        <>
        <CustomNavBar showCart={false} showHomeLink={true} showBrand={false} showSweatersLink={false} showPostersLink={false} showContactLink={false} showWholeSaleLink={false} showCartLink={false} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="appreciation-header mb-4 mt-4 text-center">We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}.</h1>

            <div className="w-100 d-flex justify-content-center">
                <Row className="w-75" style={{
                padding: '20px',
                backgroundColor: 'var(--background)',
                borderRadius: '20px',
                }}>
                <p>
                    Once we receive your order, our team will reach out to you with the next steps to complete your order. Please expect 2-3 business weeks to receive your order.
                    <br /><br />
                    If you have any questions or concerns, feel free to contact us at <strong><a href="mailto:freelunch707@gmail.com">freelunch707@gmail.com</a></strong>.
                </p>
                </Row>
            </div>
        </div>
        </>
    )
}