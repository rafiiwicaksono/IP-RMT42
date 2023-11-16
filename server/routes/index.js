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
router.get(`/admin/foods`, guardAuthorizationAdmin, FoodController.getFoods)
router.post(`/admin/foods`, guardAuthorizationAdmin, FoodController.createFood)
router.patch(`/admin/foods`, guardAuthorizationAdmin, FoodController.editFood)
router.delete(`/admin/foods`, guardAuthorizationAdmin, FoodController.destroyFood)

router.post(`/payment/stripe/token`, PaymentController.getPaymentStripe)
router.post(`/payment/stripe/confirm`, PaymentController.confirmPayment)

router.use(errorHandler)


module.exports = router