const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler')
const UserController = require('../controllers/UserController')
const ProfileController = require('../controllers/ProfileController')
const authentication = require('../middlewares/authentication')
const FoodController = require('../controllers/FoodController')
const PaymentController = require('../controllers/PaymentController')
const { guardAuthorizationAdmin } = require('../middlewares/authorization')

router.post(`/register`, UserController.createUser)
router.post(`/login`, UserController.loginUser)
router.post(`/google-login`, UserController.loginGoogle)

router.get(`/pub/foods`, FoodController.getFoodsPub)


router.use(authentication)
router.get(`/profile`, ProfileController.getProfile)
router.put(`/profile`, ProfileController.editProfile)

router.get(`/foods`, FoodController.getFoods)
router.get(`/foods/admin`, guardAuthorizationAdmin, FoodController.getFoods)
router.get(`/foods/admin/:id`, guardAuthorizationAdmin, FoodController.getFood)
router.post(`/foods/admin`, guardAuthorizationAdmin, FoodController.createFood)
router.put(`/foods/admin/:id`, guardAuthorizationAdmin, FoodController.editFood)
router.delete(`/foods/admin/:id`, guardAuthorizationAdmin, FoodController.destroyFood)

// router.post(`/payment/create-session`, PaymentController.getPaymentStripe)
// router.post(`/payment/confirm-payment`, PaymentController.confirmPayment)
router.post(`/create-payment-intent`, PaymentController.confirmPayment)

router.use(errorHandler)


module.exports = router