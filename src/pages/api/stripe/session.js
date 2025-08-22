import { stripe } from '../stripe/lib/stripe'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { session_id } = req.query

  if (!session_id) {
    return res.status(400).json({ message: 'Missing session_id' })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent']
    })

    res.status(200).json({
      status: session.status,
      customer_email: session.customer_details?.email || ''
    })
  } catch (error) {
    console.error('Error retrieving session:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
