const jwt = require('jsonwebtoken')
const Student = require('../model/student')
const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const student = await Student.findOne({
            _id: decode._id,
            'tokens.token': token
        })
        if (!student) {
            throw new Error()
        }

        req.token = token
        req.user = student
        next()
    } catch (error) {
        res.status(401).send({
            error: "please Authenticate"
        })
    }

}

module.exports = auth