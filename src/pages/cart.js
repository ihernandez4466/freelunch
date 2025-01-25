import {React, useEffect, useState} from "react";
import {Button, Container, Row, Col, Image, ButtonGroup }from "react-bootstrap"
import Loading from '../components/loading'
import useDataFetcher from '../components/fetch'
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { loadStripe } from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
require('dotenv').config();

export default function Cart({ userId, options }) {
    const user = userId
    const [data, isLoading, error, setData] = useDataFetcher({endpoint:`/api/cart?userId=${user}`})
    const [total, setTotal] = useState(0);
    // const [checkoutForm, showCheckoutForm] = useState(false)

    useEffect(() => {
        if(data){
            calculateTotal()
        }
    }, [data])

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
                  calculateTotal(data.rows)
            }
            console.log(`Successfully deleted item from cart: ${result}`);
        } catch (error) {
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
                ></Image>
            </Col>
            <Col style={{ margin: '10px 0px 10px 0px'}}>
                <p>{product.name}</p>
                <p>{`price: $${product.price}`}</p>
                <p>{`size: ${product.size}`}</p>
                <ButtonGroup style={{ padding: '0px 1rem 1rem 0px'}}>
                    <Button size="sm" style={{backgroundColor: 'var(--primary'}} disabled={product.quantity <= 1} onClick={() => handleQuantity(product, "subtract")}><GrSubtractCircle /></Button>
                    <Button size="sm" style={{backgroundColor: 'var(--primary'}} disabled >{`QTY: ${product.quantity}`}</Button>
                    <Button size="sm" style={{backgroundColor: 'var(--primary'}} disabled={product.quantity >= 100} onClick={() => handleQuantity(product, "add")}><IoIosAddCircleOutline /></Button>
                </ButtonGroup>
                <Button size="sm" style={{ margin: '0px 1rem 1rem 0px'}} onClick={() => handleRemove(product.cart_id)}>Remove</Button>
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
            { error ? (<h2>Something went wrong</h2>) : (isLoading ? (<Loading />) : 
                (data && (data.rows.length > 0 ? 
                    (
                    <>
                        {renderItems()}
                        <h2>{`Total: $${total}`}</h2>
                        <Button onClick={() => processCheckout()}>Checkout</Button>
                    </>
                    ) 
                    : (<h2>No items in cart yet</h2> ) )
                ))
            }
       </Container>
 </>
    );
}