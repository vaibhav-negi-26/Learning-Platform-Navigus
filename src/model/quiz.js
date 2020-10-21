const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
        trim: true
    },
    max_score: {
        type: String,
        trim: true,
        default: '0'
    },
    available: {
        type: String,
        trim: true,
        default: '0'
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course' //this is model name
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher' //this is model name
    }
})

quizSchema.virtual('question', {
    ref: 'question',
    localField: '_id',
    foreignField: 'quiz_id'
})

// 'quiz' is used for refrence in teacher virtual property
const Quiz = mongoose.model('quiz', quizSchema)

module.exports = Quiz