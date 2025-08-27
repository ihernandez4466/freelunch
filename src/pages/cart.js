import {React, useEffect, useState} from "react";
import {Button, Container, Row, Col, Image, ButtonGroup }from "react-bootstrap";
import Loading from '../components/loading';
import useDataFetcher from '../components/fetch';
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import MyAlert from "../components/alert";
import { GrTrash } from "react-icons/gr";


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

    useEffect(() => {
        if(data){
            calculateTotal()
        }
    }, [data])

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
        <Container key={idx} style={{ 
            boxShadow: 'rgba(190, 187, 187, 0.5) 2px 2px 2px 2px',
            margin: '1rem 0px 1rem 0px', 
            backgroundColor: 'var(--background)',
            padding: '15px'
            }}>
            {/* Image Row */}
            
            <Row>
                <Col xs={12} className="text-end">
                    <Button size="sm" style={{ backgroundColor: 'var(--primary)'}} onClick={() => handleRemove(product.cart_id)}><GrTrash /></Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="text-center">
                    <Image style={{
                        padding: '10px',
                        boxShadow: 'rgba(190, 187, 187, 0.5) 2px 2px 2px 2px',
                        backgroundColor: 'var(--primary-transparent)',
                        transition: 'all 0.3s ease, filter 0.1s ease',
                        maxWidth: '10rem',
                        maxHeight: '10rem',
                    }}
                    src={`${product.img_path}`}
                    alt="cart item"
                    ></Image>
                </Col>
            </Row>
            
            {/* Product Details Row */}
            <Row className="text-center" style={{ marginTop: '1rem'}}>
                <Col xs={12}>
                    <p>{product.name}</p>
                    <p>{`Price: $${product.price}`}</p>
                    <p>{`Size: ${product.size}`}</p>
                    <ButtonGroup size="sm" style={{ width: '50%' }}>
                        <Button style={{backgroundColor: 'var(--primary)', flex: 1}} disabled={product.quantity <= 1} onClick={() => handleQuantity(product, "subtract")}><GrSubtractCircle /></Button>
                        <Button style={{backgroundColor: 'var(--primary)', flex: 2}} disabled >{`QTY: ${product.quantity}`}</Button>
                        <Button style={{backgroundColor: 'var(--primary)', flex: 1}} disabled={product.quantity >= 100} onClick={() => handleQuantity(product, "add")}><IoIosAddCircleOutline /></Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Container>))
    }

    return (
        <>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Container style={{ flex: 1, overflowY: 'auto', paddingBottom: '20px' }}>
                { error ? (<h2>Something went wrong</h2>) : (isLoading ? (<Loading />) : 
                    (data && (data.rows.length > 0 ? 
                        (
                        <>
                        {!showCheckout &&
                            <>
                                {renderItems()}
                            </>
                        }
                        </>
                        ) 
                        : (<h2 className="no-items">No items in cart yet</h2> ) ))
                    )
                }
                {showAlert && <MyAlert message={alertMessage} success={alertSuccess} duration={1500}/>}
            </Container>
            
            {/* Sticky Footer */}
            {data && data.rows.length > 0 && !showCheckout && (
                <div style={{
                    flexShrink: 0,
                    backgroundColor: 'white',
                    borderTop: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px 20px',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
                }}>
                    <h2 className="total-btn" style={{ margin: 0 }}>{`Total: $${total}`}</h2>
                    <Button className="btn-primary" onClick={() => {
                        handleShowCart(false);
                        handleCheckout(true);
                    }}>Checkout</Button>
                </div>
            )}
        </div>
        </>
    );
}