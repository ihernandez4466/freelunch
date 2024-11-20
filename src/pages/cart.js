import React, { useEffect, useState } from "react";
import Link from 'next/link';
import {Button, Container, Nav, Card }from "react-bootstrap"
import Loading from '../components/loading'
import DataFetcher from '../components/fetch'

import Logo from '../components/logo';
import CustomNavBar from '../components/navbar';

export default function Cart(props) {
    const user = props.userId
    const [data, isLoading, error] = DataFetcher({endpoint:`/api/cart?userId=${user}`})
    const handleRemove = async (id) => {
        try {
            const response = await fetch(`/api/cart?id=${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error("Failed to delete item from cart")             
            }

            const result = await response.json();
            console.log(`Successfully deleted item from cart: ${result}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <CustomNavBar Logo={Logo} NavWithLinks={NavWithHomeLink}/>
        <Container>            
            <h1>Your Cart</h1>
            { error ? (<h1>Something went wrong</h1>) : (isLoading ? (<Loading />) : (
                data && (data.rows.length > 0 ? (data.rows.map((product, idx) => 
                    <Card key={idx} >
                        <Card.Header><Button onClick={() => handleRemove(product.id)}>X</Button></Card.Header>
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

const linkStyle = {
fontSize: '2vw',
fontWeight: '800',
color: 'var(--textPrimary)',
padding: '5px'
}
 
function NavWithHomeLink() {
  
  return (
    <Nav variant="underline"style={{ fontFamily: 'merienda' }}>
          <Link href="home" style={linkStyle}>
          Home
          </Link>
    </Nav>
  )}