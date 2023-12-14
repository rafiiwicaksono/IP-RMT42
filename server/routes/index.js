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

router.post(`/payment/midtrans/notifications`, PaymentController.getMidtransNotification)

router.use(authentication)
router.get(`/profile`, ProfileController.getProfile)
router.put(`/profile`, ProfileController.editProfile)

router.post(`/payment/midtrans/token/:id`, PaymentController.getMidtransToken)

router.get(`/foods`, FoodController.getFoods)
router.get(`/foods/admin`, guardAuthorizationAdmin, FoodController.getFoods)
router.get(`/foods/admin/:id`, guardAuthorizationAdmin, FoodController.getFood)
router.post(`/foods/admin`, guardAuthorizationAdmin, FoodController.createFood)
router.put(`/foods/admin/:id`, guardAuthorizationAdmin, FoodController.editFood)
router.delete(`/foods/admin/:id`, guardAuthorizationAdmin, FoodController.destroyFood)




router.use(errorHandler)


module.exports = router