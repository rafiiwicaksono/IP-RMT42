const { where } = require("sequelize")
const {Profile} = require(`../models`)
class ProfileController {
    static async getProfile(req, res, next) {
        try {
            let profile = await Profile.findOne({UserId: req.user.id})
            res.status(201).json(profile)
        } catch (error) {
            next(error)
        }
    }

    static async editProfile(req, res, next) {
        try {
            const {fullName, address, phoneNumber} = req.body
            let editProfile = await Profile.update({fullName, address, phoneNumber}, {
                where: {
                    UserId: req.user.id
                }
            })
            res.status(200).json(editProfile)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProfileController