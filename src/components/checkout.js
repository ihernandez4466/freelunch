'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = publishableKey ? loadStripe(publishableKey) : null

const fetchClientSecret = async ({ items }) => {
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
  if (!stripePromise) {
    return (
      <div id="checkout">
        <p>Checkout is not configured. Add <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to your .env file.</p>
      </div>
    )
  }
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret: () => fetchClientSecret({ items }) }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}