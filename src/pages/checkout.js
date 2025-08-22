import Checkout from '../components/checkout';
import { useState, useEffect } from 'react';

export default function CheckoutPage({ items }) {
  // debugger;
  const [sanitizedItems, setSanitizedItems] = useState(null);
  useEffect(() => {
    debugger;
    const sanitizedItems = items ? items.rows.map(item => ({
      "quantity": item.quantity,
      "price": item.stripe_price_id
    })) : [];
    setSanitizedItems(sanitizedItems);
  }, [items]);
  return (
    <div id="checkout">
      {sanitizedItems && sanitizedItems.length > 0 && 
        <Checkout 
          items={sanitizedItems} 
        />
      }
    </div>
  )
}