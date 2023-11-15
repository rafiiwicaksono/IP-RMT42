const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler')
const UserController = require('../controllers/UserController')
const ProfileController = require('../controllers/ProfileController')
const authentication = require('../middlewares/authentication')
const FoodController = require('../controllers/FoodController')
const PaymentController = require('../controllers/PaymentController')

router.post(`/register`, UserController.createUser)
router.post(`/login`, UserController.loginUser)

router.get(`/pub/foods`, FoodController.getFoodsPub)


router.use(authentication)
router.get(`/profile`, ProfileController.getProfile)
router.put(`/profile`, ProfileController.editProfile)
router.get(`/foods`, FoodController.getFoods)
router.post(`/payment/stripe/token`, PaymentController.getPaymentStripe)
router.post(`/payment/stripe/confirm`, PaymentController.confirmPayment)

router.use(errorHandler)


module.exports = router