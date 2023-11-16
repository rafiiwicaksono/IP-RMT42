const stripe = require('stripe')(process.env.API_KEY_STRIPE_SERVER);
const { Order } = require(`../models`)
const {Food} = require(`../models`)
class PaymentController {
    static async getPaymentStripe(req, res, next) {
        try {
            const { foodId, quantity } = req.body;

            const food = await Food.findByPk(foodId);

            if (!food) {
                throw ({name: `FoodNotFound`}) 
            }

            const order = await Order.create({
                totalAmount: (food.price * (quantity || 1)),
                totalOrder: quantity || 1,
                FoodId: food.id,
                UserId: req.user.id,
                statusPayment: 'Payment Pending'
            });

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'idr',
                        product_data: {
                            name: food.name,
                        },
                        unit_amount: food.price * 100,
                    },
                    quantity: quantity || 1
                }],
                mode: 'payment',
                success_url: `http://localhost:3000/success?orderId=${order.id}`,
                cancel_url: 'http://localhost:3000/cancel',
            });

            res.status(200).json({ id: session.id });
        } catch (error) {
            next(error)
        }
    }

    static async confirmPayment(req, res, next) {
        try {
            const { payment_method_id, orderId } = req.body;

            const paymentIntent = await stripe.paymentIntents.confirm({
                payment_method: payment_method_id,
                amount: 0,
                currency: 'idr',
            });

            if (paymentIntent.status === 'succeeded') {
                await Order.update({ status: 'Payment success' }, { where: { id: orderId } });
            }

            res.status(200).json({ success: true });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PaymentController