async function guardAuthorizationAdmin(req, res, next) {
    try {
        if (req.user.role === `admin`) {
            next()
        } else {
            throw ({ name: `Forbidden` })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {guardAuthorizationAdmin}