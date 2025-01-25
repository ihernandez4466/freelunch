import { ApiMiddleware } from '../../lib/middleware'
// import pool from '../../../database/db'

function summarizePaymentMethod(paymentMethod) {
    // Use paymentMethod.type to derive the applicable summary fields for your UI
    const type = paymentMethod.type
    console.log(type)
  }

function generateResponse(details){
  console.log(details)
  return "Confused"
}

const handler = {
    post: async (req, res) => {
      const { paymentMethod, total } = req.body
        try {
            if (paymentMethod) {
              const intent = await stripe.paymentIntents.create({
                payment_method: req.body.payment_method_id,
                amount: total,
                currency: 'usd',
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                //automatic_payment_methods: {{enabled: true}, { expand: ['payment_method'] }}
              })
              
              const details = summarizePaymentMethod(intent.payment_method);
              // Send the response to the client
              res.status(200).json(generateResponse(details));
            } else { 
              return res.status(400).json("Missing fields") 
            }

          } catch (error) {
            // Display error on client
            throw error;
          }
    }
}
export default ApiMiddleware(handler);
// require('dotenv').config();
// const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY', {
//     timeout: 30 * 1000, // 20 seconds
//   });

// stripe.customers.create({
//   email: 'customer@example.com',
// })
//   .then(customer => console.log(customer.id))
//   .catch(error => console.error(error));
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const paymentIntent = await stripe.paymentIntents.create({
//   amount: 2000,
//   currency: 'usd',
//   automatic_payment_methods: {
//     enabled: true,
//   },
// //   required params above and future ones I may want to use in the future: https://docs.stripe.com/api/payment_intents
// // customer: '',
// // description: '',
// // shipping: 
// });