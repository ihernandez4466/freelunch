import Checkout from '../components/checkout';
import { useState, useEffect } from 'react';

export default function CheckoutPage({ items }) {
  const [sanitizedItems, setSanitizedItems] = useState(null);
  useEffect(() => {
    const sanitizedItems = items ? items.rows.map(item => ({
      "quantity": item.quantity,
      "price": item.stripe_price_id,
      // Include item details for metadata
      "itemDetails": {
        "name": item.name,
        "size": item.size,
        "product_id": item.product_id || item.id,
        "quantity": item.quantity,
        "stripe_shipping_id": item.stripe_shipping_id
      }
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