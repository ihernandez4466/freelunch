import {React, useEffect, useState} from "react";
import {Button, Container, Row, Col, Image, ButtonGroup }from "react-bootstrap";
import Loading from '../components/loading';
import useDataFetcher from '../components/fetch';
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import MyAlert from "../components/alert";
import { loadStripe } from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
require('dotenv').config();

export default function Cart({ userId, handleShowCheckout, handleShowCart }) {
    const user = userId
    const [data, isLoading, error, setData] = useDataFetcher({endpoint:`/api/cart?userId=${user}`})
    const [total, setTotal] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
            setAlertSuccess(false);
            setAlertMessage(null);    
        }, 1500);
        return () => clearTimeout(timer);
    }, [showAlert])

    const handleCheckout = (show) => {
        if(show){
            setShowCheckout(true);
            handleShowCheckout(true, data);
        } else{
            setShowCheckout(false);
            handleShowCheckout(false, null);
        }
    }

    const calculateTotal = () => {
        const items = data ? data.rows : []  
        const newTotal = items.reduce((acc, item) => acc + (Number(item.total) || 0), 0)
        setTotal(newTotal)
    }

    const processCheckout = async () => {
        if(data){
            const checkoutTotal = total
            const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);
            const body = {
                total: checkoutTotal
            }
            const response = await fetch(`/api/stripe`, {
                method: 'POST',
                body: JSON.stringify(body)
            });

        } else {
            console.log("nothing to check out homie")
        }
    }

    const handleRemove = async (item_id) => {
        try {
            const response = await fetch(`/api/cart?id=${item_id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Failed to delete item from cart, error: ${response.statusText}`)             
            }

            const result = await response.json();
            if(data){
                const updatedData = {
                    ...data,
                    rows: data.rows.filter((product) => product.cart_id !== item_id),
                  };
                  setData(updatedData);
                  calculateTotal(data.rows);
            }
            setAlertMessage("Item Removed")
            setAlertSuccess(true);
            setShowAlert(true);
            console.log(`Successfully deleted item from cart: ${result}`);
        } catch (error) {
            setAlertMessage("Failed to remove item")
            setAlertSuccess(false);
            setShowAlert(true);
            console.error(error);
        }
    }

    const handleQuantity = async (product, operation) => {
        // handle quantity here
        let newQuantity = ""
        if(operation == 'add'){
            newQuantity = product.quantity+1
        } else if (operation == 'subtract'){
            newQuantity = product.quantity-1
        }
        try {
            let newTotal = newQuantity*product.price
            const response = await fetch(`/api/cart`, {
                method: 'PUT',
                body: JSON.stringify({id: product.cart_id, quantity: newQuantity, total: newTotal})
            });
            if (!response.ok) {
                throw new Error(`Failed to delete item from cart, error: ${response.statusText}`)             
            }
            const updatedItem = await response.json();
            setData(prevData => ({
                ...prevData,
                rows: prevData.rows.map(item =>
                    item.cart_id === product.cart_id
                        ? { ...item, quantity: newQuantity, total: newTotal }
                        : item
                ),
            
            }));
            calculateTotal(data.rows)
        } catch (error) {
            console.log(error)
        }
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
                alt="cart item"
                ></Image>
            </Col>
            <Col style={{ margin: '10px 0px 10px 0px'}}>
                <p style={{ color: 'var(--textSecondary)'}}>{product.name}</p>
                <p style={{ color: 'var(--textSecondary)'}}>{`price: $${product.price}`}</p>
                <p style={{ color: 'var(--textSecondary)'}}>{`size: ${product.size}`}</p>
                <ButtonGroup style={{ padding: '0px 1rem 1rem 0px'}}>
                    <Button size="sm" style={{backgroundColor: 'var(--primary'}} disabled={product.quantity <= 1} onClick={() => handleQuantity(product, "subtract")}><GrSubtractCircle /></Button>
                    <Button size="sm" style={{backgroundColor: 'var(--primary'}} disabled >{`QTY: ${product.quantity}`}</Button>
                    <Button size="sm" style={{backgroundColor: 'var(--primary'}} disabled={product.quantity >= 100} onClick={() => handleQuantity(product, "add")}><IoIosAddCircleOutline /></Button>
                </ButtonGroup>
                <Button size="sm" style={{ margin: '0px 1rem 1rem 0px', backgroundColor: 'var(--secondary)'}} onClick={() => handleRemove(product.cart_id)}>Remove</Button>
            </Col>
            </Row>))
    }

    // return (
    //     <Elements stripe={stripePromise} options={options}>
    //       <CheckoutForm />
    //     </Elements>
    //   );
    return (
        <>
        <Container>
            { error ? (<h2 style={{ color: 'var(--textSecondary)'}}>Something went wrong</h2>) : (isLoading ? (<Loading />) : 
                (data && (data.rows.length > 0 ? 
                    (
                    <>
                    {!showCheckout &&
                        <>
                            {renderItems()}
                            <h2 style={{ color: 'var(--textSecondary)'}}>{`Total: $${total}`}</h2>
                            <Button style={{ backgroundColor: 'var(--secondary)'}} onClick={() => {
                                handleShowCart(false);
                                handleCheckout(true);
                            }}>Checkout</Button>
                        </>
                    }
                    </>
                    ) 
                    : (<h2 style={{ color: 'var(--textSecondary)'}}>No items in cart yet</h2> ) )
                ))
            }
            {showAlert && <MyAlert message={alertMessage} success={alertSuccess} duration={1500}/>}
       </Container>
 </>
    );
}