import React, { useEffect, useState } from "react";
import Link from 'next/link';
import {Row, Image, Container, Nav }from "react-bootstrap"
import Loading from '../components/loading'
import DataFetcher from '../components/fetch'

import Logo from '../components/logo';
import CustomNavBar from '../components/navbar';

export default function Cart(props) {
    const user = props.userId
    const [data, isLoading, error] = DataFetcher({endpoint:`/api/cart?userId=${user}`})

      return (
        <>
        <CustomNavBar Logo={Logo} NavWithLinks={NavWithHomeLink}/>
        <Container>            
            <h1>Your Cart</h1>
            { error ? (<h1>Something went wrong</h1>) : (isLoading ? (<Loading />) : (
                data && (data.rows.length > 0 ? (data.rows.map((product, idx) => 
                    <Row key={idx}>
                        <h1>{product.name}</h1>
                        <Image
                            style={{
                                padding: '10px',
                                boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                                backgroundColor: 'rgb(72, 88, 14, 0.1)',
                                transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                                maxWidth: '30%',
                                maxHeight: '30%',
                            }}
                            src={`${product.img_path}`}
                        />
                        <h2>{product.size}</h2>
                        <h2>{product.quantity}</h2>
                        <h2>{product.total}</h2>
                    </Row>  )) : <h1>No items in cart yet</h1> ) 
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