const mongoose = require('mongoose')

const quizResultSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
        trim: true
    },
    scored: {
        type: String,
        trim: true,
        required: true
    },
    max_score: {
        type: String,
        trim: true,
        required: true
    },
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'quiz' //this is model name
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student' //this is model name
    }
})

// 'quiz' is used for refrence in teacher virtual property
const quizResult = mongoose.model('quizResult', quizResultSchema)

module.exports = quizResult