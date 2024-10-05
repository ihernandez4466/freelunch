import React, { useEffect, useState } from "react";
import cartItems from '../mock_data/cart_item.json';
import products from '../mock_data/cart_item.json';
import shoppingSessions from '../mock_data/shopping_session.json';

function selectCartItems(user_id) {
 // mimick a sql statement to get cart items for user and set state
    // get session id from user id
    // use session id to get cart items
    // for each cart items get product info
}
export default function Cart(user_id) {
    const [cartItems, setCartItems] = useState([]);
    const [userCart, setUserCart] = useState([]);
    
    useEffect(() => {
        const currentCart = selectCartItems(user_id);
        setUserCart(currentCart)    
    }, [cartItems])

    return (
        <>
            <h1>Your Cart</h1>  
            {products.map((id, product) => 
                <Row>
                    <h1>{product.name}</h1>
                    <Image
                        style={{
                            padding: '10px',
                            boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                            backgroundColor: 'rgb(72, 88, 14, 0.1)',
                            transition: 'all 0.3s ease, filter 0.1s ease', // Add a transition for all properties over 0.3 seconds with ease timing function
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}
                        src={product.img_path}
                    />
                    <h2>{product.description}</h2>
                    <h2>{product.price}</h2>
                </Row>
            )}
        </>
    );
}