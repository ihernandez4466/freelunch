import { stripe } from '../lib/stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { items } = req.body
  
  try {
    const origin = req.headers.origin || `https://${req.headers.host}`

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: items,
      mode: 'payment', // one time payment -> can change to subscription or future payment
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    })

    res.status(200).json({ client_secret: session.client_secret })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}