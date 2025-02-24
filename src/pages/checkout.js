import { useEffect, useState } from "react";
import {Row, Col, Image, Container }from "react-bootstrap"
import Loading from '../components/loading'
import useDataFetcher from '../components/fetch'
import ContactForm from "../components/contact-form";

export default function Checkout({ userId }) {
    const user = '3d153c13-2dfe-485c-822f-03210c5d9790' // userId
    const [salesTax, setSalesTax] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [salesTaxTotal, setSalesTaxTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [data, isLoading, error, setData] = useDataFetcher({endpoint:`/api/cart?userId=${user}`});

    useEffect(() => {
        const getTaxRate = async () => {
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
    }, [subTotal, salesTaxTotal])

    const handleContact = (e) => {
        console.log(e.target)
    }
    const totalPriceCalulator = () => {
        setTotalPrice(salesTaxTotal + subTotal)
    }
    const totalCalculator = () => {
        const items = data ? data.rows : []  
        const total = items.reduce((acc, item) => acc + (Number(item.total) || 0), 0)
        setSubTotal(total);
    }
    const salesTaxCalculator = () => {
        const taxAmount = subTotal * salesTax;
        setSalesTaxTotal(taxAmount);
    }
      
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
                ></Image>
            </Col>
            <Col style={{ margin: '10px 0px 10px 0px'}} className="d-flex flex-column justify-content-center align-items-start">
                <p>{product.name}</p>
                <p>{`price: $${product.price}`}</p>
                <p>{`size: ${product.size}`}</p>
                <p>{`QTY: ${product.quantity}`}</p>
            </Col>
            </Row>))
    }
    
    return (
        <Container fluid className="d-flex flex-column align-items-center py-5">
            {error ? (
                <h2 className="text-danger text-center">Something went wrong</h2>
            ) : isLoading ? (
                <Loading />
            ) : (
                <>
                <h1 className="mb-4">Order Summary</h1>

                <Row className="justify-content-center w-100">
                    <Col md={8} lg={6} className="p-4 border rounded shadow-sm bg-light">
                    {data && data.rows ? (
                        <>
                        <div className="mb-4">{renderItems(data.rows)}</div>

                        <div className="text-center">
                            <p className="mb-2">Sub Total: ${subTotal}</p>
                            <p className="mb-2">{`Tax (${(salesTax * 100).toFixed(2)}%): $${salesTaxTotal}`}</p>
                            <h3>Order Total: <strong>${totalPrice}</strong></h3>
                        </div>
                        </>
                    ) : (
                        <p className="text-muted text-center">No items to checkout</p>
                    )}
                    </Col>
                </Row>
                <h1 className="mt-4">Contact Information</h1>
                <Row className="justify-content-center w-100 mt-4">
                    <Col md={6} lg={4} className="p-4">
                    <ContactForm handleSubmit={handleContact} submitString="Complete Order" />
                    </Col>
                </Row>
                <Row className="justify-content-center w-50" style={{ padding: '30px', backgroundColor: 'var(--primary-transparent)', borderRadius: '20px 20px 20px 20px', display: 'flex', justifyContent: 'center'}}>
                <p>Your order details will be sent to our official email address for further processing.

                    Once we receive your order, our team will reach out to you with the next steps to complete your order. 

                    We appreciate your understanding as we work to enhance our checkout system and ensure a safe and seamless experience for all our customers.

                    If you have any questions or concerns, feel free to contact us at <strong>freelunch707@gmail.com</strong></p>
                </Row>
                </>
            )}
            </Container>
            )
}