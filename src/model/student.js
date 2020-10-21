const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is already taken!!")
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 6,
    },
    contact: {
        type: String,
        require: true,
        trim: true,
        maxlength: 12,
    },
    college: {
        type: String,
        require: true,
        trim: true
    },
    tokens : [{
        token: {
            type: String,
            require: true
        }
    }]
})

// virtual schema for linking task and users
StudentSchema.virtual('quizResult', {
    ref: 'quizResult',
    localField: '_id',
    foreignField: 'student_id'
})


// removing private data from user obj before sending response back to user
StudentSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()

    delete userObj.tokens
    delete userObj.password
    delete userObj.__v

    return userObj
}

// generating auth tokens
StudentSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// creating login function for model
StudentSchema.statics.findByCredentials = async (email, password) => {
    const user = await Student.findOne({
        email
    })
    if (!user) {
        throw new Error('Unable to login!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login!')
    }
    return user
}

// mongoose middleware before save to hash password again if changed
StudentSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const Student = mongoose.model('Student', StudentSchema)

module.exports = Student