import { stripe } from '../lib/stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { items } = req.body
  
  try {
    const origin = req.headers.origin || `https://${req.headers.host}`

    // Extract line items (remove itemDetails for Stripe)
    const stripeLineItems = items.map(({ itemDetails, ...stripeItem }) => stripeItem);

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: stripeLineItems,
      mode: 'payment', // one time payment -> can change to subscription or future payment
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // Add countries you ship to
      },
      shipping_options: [
        { shipping_rate: items[0]?.itemDetails?.stripe_shipping_id } // this assumes they all have the same shipping price
      ],
      billing_address_collection: 'required', // Optional: also collect billing address
      // Dark mode – matches site (--background-dark, --primary). Requires API version 2025-09-30.clover+ for branding_settings.
      branding_settings: {
        background_color: '#000000',
        button_color: '#FB3232',
      },
      payment_intent_data: {
        metadata: {
          order_items: JSON.stringify(items.map(item => ({
            name: item.itemDetails?.name || 'Unknown Product',
            size: item.itemDetails?.size || 'N/A',
            product_id: item.itemDetails?.product_id || 'N/A',
            quantity: item.itemDetails.quantity
          }))),
          order_summary: items.map(item => 
            `${item.itemDetails?.name || 'Product'} (Size: ${item.itemDetails?.size?.toUpperCase() || 'N/A'}) x${item.itemDetails?.quantity || item.quantity}`
          ).join(', ')
        }
      }
    })

    res.status(200).json({ client_secret: session.client_secret })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}