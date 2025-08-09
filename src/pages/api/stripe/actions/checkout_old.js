// pages/api/payment/checkout.js
import { ApiMiddleware } from '../../lib/middleware'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = {
    post: async (req, res) => {
        try {
            const data = JSON.parse(req.body);
            const lineItems = data.customer_order.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.img_path],
                    },
                    unit_amount: Math.round(item.price * 100), // in cents
                },
                quantity: item.quantity,
            }));

            const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            customer_email: data.customer_email,
            success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/checkout/cancel`,
            metadata: {
                user_id: data.user_id,
                session_id: data.session_id,
            }
            });

            res.status(200).json({ id: session.id });
        } catch (err) {
            console.error(err);
            throw new Error('Unable to create Stripe Checkout Session');
        }
    }   
};

export default ApiMiddleware(handler);

