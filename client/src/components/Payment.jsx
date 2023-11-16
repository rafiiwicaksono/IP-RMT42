import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const Payment = () => {
    const location = useLocation();
    const orderId = new URLSearchParams(location.search).get('orderId');
    const paymentMethodId = new URLSearchParams(location.search).get('paymentMethodId');
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
                const response = await axios.post('http://localhost:3000/payment/confirm-payment', {
                    payment_method_id: paymentMethodId,
                    orderId: orderId,
                }, config);

                if (response.data.success) {
                    setPaymentConfirmed(true);
                } else {
                    console.error('Payment confirmation failed.');
                }
            } catch (error) {
                console.error('Error confirming payment:', error);
            }
        };

        if (orderId && paymentMethodId) {
            confirmPayment();
        }
    }, [orderId, paymentMethodId]);

    return (
        <div>
            {paymentConfirmed ? (
                <h2>Payment Successful! Thank you for your purchase.</h2>
            ) : (
                <h2>Processing payment...</h2>
            )}
        </div>
    );
};