const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    credit: {
        type: String,
        required: true,
        trim: true
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher' //this is model name
    }
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course