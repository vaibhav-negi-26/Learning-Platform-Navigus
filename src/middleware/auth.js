const jwt = require('jsonwebtoken')
const Teacher = require('../model/teacher')
const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const teacher = await Teacher.findOne({
            _id: decode._id,
            'tokens.token': token
        })
        if (!teacher) {
            throw new Error()
        }

        req.token = token
        req.user = teacher
        next()
    } catch (error) {
        res.status(401).send({
            error: "please Authenticate"
        })
    }

}

module.exports = auth