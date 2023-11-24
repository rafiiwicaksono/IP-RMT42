import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { token, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      const response = await fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
      });

      const { clientSecret } = await response.json();

      const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: token.card.id,
      });

      if (confirmPayment.error) {
        setError(confirmPayment.error.message);
        setLoading(false);
      } else {
        alert('Pembayaran Berhasil!');
        setLoading(false);
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      },
      invalid: {
        color: '#fa755a',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Informasi Kartu Kredit:</label>
        <CardElement options={cardElementOptions}/>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Memproses Pembayaran...' : 'Bayar'}
      </button>
    </form>
  );
};
