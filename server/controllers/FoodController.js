
const {Food} = require(`../models`)
class FoodController {
    static async getFoodsPub(req, res, next) {
        try {
            const foods = await Food.findAll()
            console.log(foods)
            res.status(200).json(foods)
        } catch (error) {
            next(error)
        }
    }

    static async getFoods(req, res, next) {
        try {
            const foods = await Food.findAll()
            console.log(foods)
            res.status(200).json(foods)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = FoodController