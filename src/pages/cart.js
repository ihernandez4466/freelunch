import React, { useEffect, useState } from "react";
import {Button, Container, Nav, Card }from "react-bootstrap"
import Loading from '../components/loading'
import useDataFetcher from '../components/fetch'


export default function Cart(props) {
    const user = props.userId
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
            <h1>Your Cart</h1>
            { error ? (<h1>Something went wrong</h1>) : (isLoading ? (<Loading />) : (
                data && (data.rows.length > 0 ? (data.rows.map((product, idx) => 
                    <Card key={idx} >
                        <Card.Header><Button onClick={() => handleRemove(product.cart_id)}>&times</Button></Card.Header>
                        <Card.Title className="text-center">{product.name}</Card.Title>
                        <Card.Img
                            style={{
                                padding: '10px',
                                boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                                backgroundColor: 'var(--primary-transparent)',
                                transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                                maxWidth: '85%',
                                maxHeight: 'auto',
                            }}
                            src={`${product.img_path}`}
                        />
                        <Card.Subtitle>{product.price}</Card.Subtitle>
                        <Card.Subtitle>{`Quantity: ${product.quantity}`}</Card.Subtitle>
                        <Card.Subtitle>{`Total: ${product.total}`}</Card.Subtitle>
                    </Card>  )) : <h1>No items in cart yet</h1> ) 
            ))}
       </Container>
 </>
    );
}