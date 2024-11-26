import React, { useEffect, useState } from "react";
import {Button, Container, Row, Col, Image }from "react-bootstrap"
import Loading from '../components/loading'
import useDataFetcher from '../components/fetch'


export default function Cart({ userId }) {
    const user = userId
    const [data, isLoading, error, setData] = useDataFetcher({endpoint:`/api/cart?userId=${user}`})
    
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
            }
            console.log(`Successfully deleted item from cart: ${result}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <Container>
            { error ? (<h2>Something went wrong</h2>) : (isLoading ? (<Loading />) : (
                data && (data.rows.length > 0 ? 
                    <>
                    {data.rows.map((product, idx) => 
                    <Row key={idx}>
                        <Col sm={6} md={4} lg={4}>
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
                            <Button onClick={() => handleRemove(product.cart_id)}>Remove</Button>
                        </Col>
                        <Col sm={6} md={8} lg={8}>
                            <p>{product.name}</p>
                            <p>{`price: $${product.price}`}</p>
                            <p>{`size: ${product.size}`}</p>
                            <p>{`QTY: ${product.quantity}`}</p>
                        </Col>
                        </Row>)}
                        <h2>{`Total: $${data.rows.reduce((acc, item) => acc + (Number(item.total) || 0), 0)}`}</h2>
                        </> : <h2>No items in cart yet</h2> ) 
            ))}
       </Container>
 </>
    );
}