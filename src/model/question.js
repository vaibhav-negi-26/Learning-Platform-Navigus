const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    opt_1: {
        type: String,
        trim: true,
        required: true
    },
    opt_2: {
        type: String,
        trim: true,
        required: true
    },
    opt_3: {
        type: String,
        trim: true,
        required: true
    },
    opt_4: {
        type: String,
        trim: true,
        required: true
    },
    correct_opt: {
        type: String,
        trim: true,
        required: true
    },
    explanation: {
        type: String,
        trim: true,
        required: true
    },
    points: {
        type: String,
        trim: true,
        required: true
    },
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'quiz' //this is model name
    },
})

// 'question' is used for refrence in teacher virtual property

const Question = mongoose.model('question', questionSchema)

module.exports = Question