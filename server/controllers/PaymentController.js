const midtransClient = require('midtrans-client');
const { Order, Food, User } = require(`../models`)

class PaymentController {
    static async getMidtransToken(req, res, next) {
        try {
            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });
            const lastOrder = await Order.findOne({
                order: [["createdAt", "desc"]]
            })
            const lastId = lastOrder ? lastOrder.id + 1 : 1

            const foodId = await Food.findByPk(req.params.id)

            const order = await Order.create({
                orderId: `CC-${Date.now()}${lastId}`,
                totalAmount: `${foodId.price}00`,
                totalOrder: 1,
                FoodId: foodId.id,
                UserId: req.user.id,
                statusPayment: "pending"
            })

            let parameter = {
                "transaction_details": {
                    "order_id": order.orderId,
                    "gross_amount": order.totalAmount
                },
                "item_details": [
                    {
                        "id": foodId.id,
                        "price": order.totalAmount,
                        "quantity": 1,
                        "name": foodId.name
                    }
                ],
                "customer_details": {
                    "first_name": req.user.username,
                    "email": req.user.email
                }
            };
            const response = await snap.createTransaction(parameter)
            res.json(response)
        } catch (error) {
            next(error)
        }
    }

    static async getMidtransNotification(req, res, next) {
        try {
            const statusResponse = req.body
            let orderId = statusResponse.order_id;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;

            const order = await Order.findOne({where: {orderId: orderId}})

            const successPayment = async () => {
                await Order.update({
                    statusPayment: "paid"
                },
                {
                    where: {
                        orderId: order.orderId
                    }
                })
            }
            if (transactionStatus == 'capture') {
                if (fraudStatus == 'accept') {
                    await successPayment()
                }
            } else if (transactionStatus == 'settlement') {
                await successPayment()
            } else if (transactionStatus == 'cancel' ||
                transactionStatus == 'deny' ||
                transactionStatus == 'expire') {
                await order.update({statusPayment: "fail"})
            } 
            res.status(200).json({message: `OK`})
        } catch (error) {
            next(error)
        }
    }

    static async getTransactions(req, res, next) {
        try {
            const transaction = await Order.findAll({
                where: {
                    UserId: req.user.id
                },
                include: [
                    {
                        model: User
                    },
                    {
                        model: Food
                    }
                ]
            })
            res.status(200).json(transaction)
        } catch (error) {
            next(error)
        }
    }

    static async changeStatusPayment(req, res, next) {
        try {
            const order = await Order.findByPk(req.params.id)
            if (!order) {
                throw ({ name: `OrderNotFound` })
            }
            const update = await order.update({statusPayment: `success`})
            res.status(200).json(update)
        } catch (error) {
            next(error)
        }
    }

    static async cancelPayment(req, res, next) {
        try {
            const order = await Order.findByPk(req.params.id)
            if (!order) {
                throw ({ name: `OrderNotFound` })
            }
            await order.destroy()
            res.status(200).json({ message: `order id with ${order.orderId} success to cancel` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PaymentController