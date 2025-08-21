'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

require('dotenv').config();

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const fetchClientSecret = async ({ items }) => {
  // Example items - you'll want to pass these dynamically based on your cart/product selection
  // const items = [
  //   {
  //     price: 'price_1Rxgkl4OXI1oDmGWEcNDtPqa', // Replace with actual Stripe price ID
  //     quantity: 1
  //   }
    // Add more items as needed

  const response = await fetch('/api/stripe/actions/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items })
  })
  
  if (!response.ok) {
    throw new Error('Failed to create checkout session')
  }
  
  const data = await response.json()
  return data.client_secret
}

export default function Checkout({ items }) {
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret: fetchClientSecret(items) }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}