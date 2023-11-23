// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// export const Payment = () => {
//     const location = useLocation();
//     const orderId = new URLSearchParams(location.search).get('orderId');
//     const paymentMethodId = new URLSearchParams(location.search).get('paymentMethodId');
//     const [paymentConfirmed, setPaymentConfirmed] = useState(false);

//     useEffect(() => {
//         const confirmPayment = async () => {
//             try {
//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${access_token}`
//                     }
//                 }
//                 const response = await axios.post('http://localhost:3000/payment/confirm-payment', {
//                     payment_method_id: paymentMethodId,
//                     orderId: orderId,
//                 }, config);

//                 if (response.data.success) {
//                     setPaymentConfirmed(true);
//                 } else {
//                     console.error('Payment confirmation failed.');
//                 }
//             } catch (error) {
//                 console.error('Error confirming payment:', error);
//             }
//         };

//         if (orderId && paymentMethodId) {
//             confirmPayment();
//         }
//     }, [orderId, paymentMethodId]);

//     return (
//         <div>
//             {paymentConfirmed ? (
//                 <h2>Payment Successful! Thank you for your purchase.</h2>
//             ) : (
//                 <h2>Processing payment...</h2>
//             )}
//         </div>
//     );
// };

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {CheckoutForm} from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51OCg92KoOWgJsHAtdulNkMWskxkUJaLDCURqbdy7TqGv7gtcTdDKNo35CemjupNFbz5dyusQiPI2O9YXnaYoz9qV00XTBUisZP');

export const Payment = () => {
  const [amount, setAmount] = React.useState(1000);

  return (
    <div>
      <h1>Form Pembayaran dengan Stripe</h1>
      <p>Total Pembayaran: ${amount / 100}</p>

      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
};