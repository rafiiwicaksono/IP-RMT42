const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler')
const UserController = require('../controllers/UserController')
const ProfileController = require('../controllers/ProfileController')
const authentication = require('../middlewares/authentication')
const FoodController = require('../controllers/FoodController')

router.post(`/register`, UserController.createUser)
router.post(`/login`, UserController.loginUser)

router.get(`/pub/foods`, FoodController.getFoods)


router.use(authentication)
router.get(`/profile`, ProfileController.getProfile)
router.put(`/profile`, ProfileController.editProfile)


router.use(errorHandler)


module.exports = router