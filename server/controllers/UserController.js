const { comparePassword } = require("../helper/bcrypt")
const { signToken } = require("../helper/jwt")
const { User } = require(`../models`)
const { Profile } = require(`../models`)
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
class UserController {
    static async createUser(req, res, next) {
        try {
            const { username, email, password } = req.body
            const user = await User.create({ username, email, password })
            await Profile.create({ UserId: user.id })
            res.status(201).json({ "id": user.id, "email": user.email })
        } catch (error) {
            next(error)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw ({ name: `loginEmailNotFill` })
            }
            if (!password) {
                throw ({ name: `loginPasswordNotFill` })
            }
            const user = await User.findOne({ where: { email: email } })
            if (!user) {
                throw ({ name: `UserNotFound` })
            }
            const isValidPasword = comparePassword(password, user.password)
            if (!isValidPasword) {
                throw ({ name: `UserNotFound` })
            }
            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token, email: user.email })
        } catch (error) {
            next(error)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.g_token,
                audience: process.env.G_CLIENT
            });
            const payload = ticket.getPayload();

            let user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if (!user) {
                user = await User.create({
                    username: payload.name,
                    email: payload.email,
                    password: String(Math.random())
                })
                await Profile.create({ UserId: user.id })
            }
            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token, email: user.email })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController