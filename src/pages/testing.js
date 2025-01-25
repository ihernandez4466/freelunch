import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
require('dotenv').config();

import CheckoutForm from '../components/checkoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51QWMniGI98uYeqTYfnVi5ImyT1HKgmmu1jcYiBMDV4APgEpnCsmOekGTWW8Qxer0nOkQsqegLUE6igTsPGtLQfRJ00XtzIdaaJ');

export default function TestingStripe() {
  const options = {
    mode: 'payment',
    amount: 1,
    currency: 'usd',
    paymentMethodCreation: 'manual',
    // Fully customizable with appearance API.
    appearance: {/*...*/},
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};