import { useEffect, useState } from "react";
import {Row, Col, Image, Container }from "react-bootstrap"
import Loading from '../components/loading'
import useDataFetcher from '../components/fetch'
import ContactForm from "../components/contact-form";

export default function Checkout({ userId }) {
    const user = userId
    const [salesTax, setSalesTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [salesTaxTotal, setSalesTaxTotal] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
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
    }, [salesTax, total])

    useEffect(() => {
        totalPriceCalulator();
    }, [total, salesTaxTotal])

    const handleContact = (e) => {
        console.log(e.target)
    }
    const totalPriceCalulator = () => {
        setFinalPrice(salesTaxTotal + total)
    }
    const totalCalculator = () => {
        const items = data ? data.rows : []  
        const total = items.reduce((acc, item) => acc + (Number(item.total) || 0), 0)
        setTotal(total);
    }
    const salesTaxCalculator = () => {
        const taxAmount = total * salesTax;
        setSalesTaxTotal(taxAmount);
    }
      
    const renderItems = (data) => {
        return data.map((product, idx) => (
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
        <Container fluid>
            { error ? (<h2>Something went wrong</h2>) : (isLoading ? (<Loading />) : 
            (
            <>
            <h1>Order Details</h1>
            <Row>
                {data && data.rows ? (
                    <>
                    {renderItems(data.rows)}
                    <div>
                        <h2>Total Price: ${total}</h2>
                        <h2>{`Tax (${salesTax}): ${salesTaxTotal}`}</h2>
                        <h2>Final Price: ${finalPrice}</h2>
                    </div>
                    </>
                ) : <p>No Items to Checkout</p>}
            </Row>
            <Row>
                <ContactForm handleSubmit={handleContact} submitString="Checkout"/>
            </Row>
            </>))
            }
        </Container>
    )
}