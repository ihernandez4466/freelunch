import {Row, Col, Image, Container, Alert }from "react-bootstrap"
import { useEffect, useState } from "react";
import useDataFetcher from '../../components/fetch'
import ContactForm from "../../components/contact-form";
import Loading from "../../components/loading";

export default function CheckoutSummary({ user, setRecipientCallback, setOrderCompleteCallback }){
    const [totalPrice, setTotalPrice] = useState(null);
    const [salesTax, setSalesTax] = useState(null);
    const [subTotal, setSubTotal] = useState(null);
    const [salesTaxTotal, setSalesTaxTotal] = useState(null);
    const [data, error, setData] = useDataFetcher({endpoint:`/api/cart?userId=${user}`});
    const [taxIsLoading, setTaxIsLoading] = useState(false);
    const [checkoutSubmitLoading, setCheckoutSubmitLoading] = useState(false);

    const renderItems = (data) => {
            return data.map((product, idx) => (
            <Row key={idx} style={{ borderTop:'0.5px black solid', borderBottom: '0.5px black solid'}}>
                <Col style={{ margin: '10px 0px 10px 0px'}} className="d-flex justify-content-end align-items-center">
                    <Image style={{
                        padding: '10px',
                        boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                        backgroundColor: 'var(--primary-transparent)',
                        transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}
                    src={`${product.img_path}`}
                    alt="cart item"
                    ></Image>
                </Col>
                <Col style={{ margin: '10px 0px 10px 0px'}} className="d-flex flex-column justify-content-center align-items-start">
                    <h3>{product.name}</h3>
                    <h3>{`price: $${product.price}`}</h3>
                    <h3>{`size: ${product.size}`}</h3>
                    <h3>{`QTY: ${product.quantity}`}</h3>
                </Col>
                </Row>))
    }
    useEffect(() => {
        const getTaxRate = async () => {
            setTaxIsLoading(true);
            try {
                const response = await fetch('/api/payment/tax');
                const taxInfo = await response.json(); // Parse JSON response
                setSalesTax(taxInfo.rate); // Update state
            } catch (error) {
                console.error("Failed to fetch tax rate:", error);
                setSalesTax(null); // Handle failure gracefully
            }
        }

        getTaxRate();
    }, [])
    useEffect(() => {
        totalCalculator();
    }, [data])

    useEffect(() => {
        salesTaxCalculator();
    }, [salesTax, subTotal])

    useEffect(() => {
        totalPriceCalulator();
        if(totalPrice > 0) { 
            setTaxIsLoading(false); 
        }
    }, [subTotal, salesTaxTotal])

    
    const totalPriceCalulator = () => {
        let total = salesTaxTotal + subTotal
        setTotalPrice(total)
    }
    const totalCalculator = () => {
        let items = data ? data.rows : []  
        let total = items.reduce((acc, item) => acc + (Number(item.total) || 0), 0)
        setSubTotal(total);
    }
    const salesTaxCalculator = () => {
        const taxAmount = subTotal * salesTax;
        setSalesTaxTotal(taxAmount);
    }
    const handleCompleteOrder = async (e) => {
        setCheckoutSubmitLoading(true);
        e.preventDefault();
        const session_id = data ? data.rows[0].session_id : 0
        const orderData = {
            customer_first: e.target.customer_first.value, 
            customer_last: e.target.customer_last.value, 
            customer_email: e.target.customer_email.value,
            customer_phone: e.target.customer_phone.value,
            customer_comments: e.target.customer_comments.value,
            customer_order: data ? data.rows : data,
            order_total: totalPrice,
            user_id: user,
            session_id: session_id
        }
        try {
            console.log(orderData);
            const response = await fetch('/api/payment/checkout', {
                method: 'POST',
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form")             
            }

            const result = await response.json();
            setRecipientCallback(e.target.customer_email.value)
            setOrderCompleteCallback(true)
            setData(null)
            console.log("Successfully submitted order!");
        } catch (error) {
            console.error('Error submitting order:', error);
        }
        setCheckoutSubmitLoading(false);
    }
    return (
        <>
        {error ? <></> :
            (
            <Container className="modal-white" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <h1 className="mb-4" style={{color: 'var(--textPrimary)'}}>Order Summary</h1>
            {(taxIsLoading || checkoutSubmitLoading) ? <Loading /> : (
                <>
                <Row className="justify-content-center w-100">
                    <Col md={8} lg={6} className="p-4 border rounded shadow-sm bg-light">
                        {data && data.rows ? (
                            <>
                            <div className="mb-4">{renderItems(data.rows)}</div>
                                <div className="text-center">
                                    <h3 className="mb-2">Sub Total: ${subTotal}</h3>
                                    <h3 className="mb-2">{`Tax (${salesTax * 100}%): $${salesTaxTotal}`}</h3>
                                    <h2>Order Total: <strong>${totalPrice.toFixed(2)}</strong></h2>
                                </div>
                            </>
                            ) : (
                                <h3 className="text-muted text-center">No items to checkout</h3>
                            )
                        }
                    </Col>
                </Row>
                <Row className="justify-content-center" style={{ padding: '10px', margin: '10px 0px 10px 0px', borderRadius: '20px 20px 20px 20px'}}>
                    <p style={{ textAlign: 'center', marginBottom: '0px'}}><strong>Please complete contact information below for further processing.</strong></p>
                </Row>
                <Row>
                    <h1 style={{textAlign:'center'}}>Contact Information</h1>
                    <ContactForm handleSubmit={handleCompleteOrder} submitString="Complete Order" />
                    <Alert variant="secondary">
                        Once we receive your order, our team will reach out to you with the next steps. 

                        We appreciate your understanding as we work to enhance our checkout system and ensure a safe and seamless experience for all our customers.</Alert>
                </Row>
                </>)}
            </Container>)
        }
        </>
    )
}