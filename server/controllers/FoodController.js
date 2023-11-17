
const {Food} = require(`../models`)
class FoodController {
    static async getFoodsPub(req, res, next) {
        try {
            const foods = await Food.findAll()
            res.status(200).json(foods)
        } catch (error) {
            next(error)
        }
    }

    static async getFoods(req, res, next) {
        try {
            const foods = await Food.findAll()
            res.status(200).json(foods)
        } catch (error) {
            next(error)
        }
    }

    static async createFood(req, res, next) {
        try {
            const {name, imageUrl, price, calory} = req.body
            const food = await Food.create({ name, imageUrl, price, calory, UserId: req.user.id })
            res.status(201).json(food)
        } catch (error) {
            next(error)
        }
    }

    static async editFood(req, res, next) {
        try {
            const food = await Food.findByPk(req.params.id)
            if (!food) {
                throw ({ name: `FoodNotFound` })
            }
            const {name, imageUrl, price, calory} = req.body
            const editFood = await food.update({name, imageUrl, price, calory})
            res.status(200).json(editFood)
        } catch (error) {
            next(error)
        }
    }

    static async destroyFood(req, res, next) {
        try {
            const food = await Food.findByPk(req.params.id)
            if (!food) {
                throw ({ name: `FoodNotFound` })
            }
            await food.destroy()
            res.status(200).json({ message: `${food.name} success to delete` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = FoodController