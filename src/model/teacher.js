const mongoose = require('mongoose')
const validator = require('validator')

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
    }
})

// ,
//     tokens : [{
//         token: {
//             type: String,
//             require: true
//         }
//     }]



const Teacher = mongoose.model('Teacher', TeacherSchema)

module.exports = Teacher