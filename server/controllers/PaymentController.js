const stripe = require('stripe')(process.env.API_KEY_STRIPE_SERVER);
class PaymentController {
    static async getPaymentStripe(req, res, next) {
        try {
            const { items } = req.body;
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: items.map(item => ({
                    price_data: {
                        currency: 'idr',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                })),
                mode: 'payment',
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel',
            });

            res.status(200).json({ id: session.id });
        } catch (error) {
            next(error)
        }
    }

    static async confirmPayment(req, res, next) {
        try {
            const { payment_method_id, items } = req.body;
        
            function calculateTotalAmount(items) {
                return items.reduce((total, item) => total + item.price * item.quantity, 0);
            }

            const paymentIntent = await stripe.paymentIntents.confirm({
                payment_method: payment_method_id,
                amount: calculateTotalAmount(items),
                currency: 'idr',
            });


            if (paymentIntent.status === 'succeeded') {

            }

            res.json({ success: true });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PaymentController