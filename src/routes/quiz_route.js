const express = require('express')
const router = new express.Router()
const Quiz = require('../model/quiz')
const Question = require('../model/question')
const auth = require('../middleware/auth')

// finding all quiz realted to a teacher
router.get('/quiz/me', auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'quiz',
            options: {
                sort: {
                    course_name: 1
                }
            }
        }).execPopulate()
        res.send(req.user.quiz)
    } catch (error) {
        res.status(500).send(error)
    }
})

// finding all quiz
router.get('/quiz/all', auth, async (req, res) => {
    try {
        const quiz = await Quiz.find({
            available: "1"
        }).sort({course_name: 1})
        res.send(quiz)
    } catch (error) {
        res.status(500).send(error)
    }
})

// update course endpoints
router.patch('/quiz/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["max_score", "available"]
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        res.status(400).send({
            error: "invalid field is being updated!"
        })
    }
    // course id
    const _id = req.params.id

    try {
        const quiz = await Quiz.findOne({
            _id,
            teacher_id: req.user._id
        })
        if (!quiz) {
            return res.status(404).send({
                error: "quiz not found!"
            })
        }
        updates.forEach((update) => quiz[update] = req.body[update])
        await quiz.save()
        res.send(quiz)
    } catch (error) {
        res.status(500).send()
    }
})

// delete course endpoints
router.delete('/quiz/:id', auth, async (req, res) => {
    // quiz id
    const _id = req.params.id

    try {
        const quiz = await Quiz.findOne({
            _id,
            teacher_id: req.user._id
        })
        if (!quiz) {
            return res.status(404).send({
                error: "quiz not found!"
            })
        }
        quiz.max_score = '0'
        quiz.available = '0'
        await quiz.save()
        // delete all questions
        await Question.deleteMany({
            quiz_id: _id
        })
        res.send(quiz)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router