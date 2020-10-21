const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const TeacherSchema = new mongoose.Schema({
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
    contact: {
        type: String,
        require: true,
        trim: true,
        maxlength: 12,
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 6,
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

// removing private data from user obj before sending response back to user
TeacherSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()

    delete userObj.tokens
    delete userObj.password
    delete userObj.__v

    return userObj
}

// generating auth tokens
TeacherSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// creating login function for model
TeacherSchema.statics.findByCredentials = async (email, password) => {
    const user = await Teacher.findOne({
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
TeacherSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const Teacher = mongoose.model('Teacher', TeacherSchema)

module.exports = Teacher