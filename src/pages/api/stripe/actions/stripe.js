'use server'

import { headers } from 'next/headers'

import { stripe } from '../lib/stripe.js'

export async function fetchClientSecret() {
  const origin = (await headers()).get('origin')

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // TODO: Provide the exact Price ID (for example, price_1234) of
        // the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1
      }
    ],
    mode: 'payment', // one time payment -> can change to subscription or future payment
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret
}