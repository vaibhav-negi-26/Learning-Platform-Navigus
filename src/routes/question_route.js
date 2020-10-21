const express = require('express')
const router = new express.Router()
const Quiz = require('../model/quiz')
const Question = require('../model/question')
const auth = require('../middleware/auth')

// Create Question
router.post('/question/create/:id', auth, async (req, res) => {
    const quiz_id = req.params.id

    const question = new Question({
        ...req.body,
        quiz_id
    })

    try {
        await question.save()
        res.status(201).send({
            question
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// Get question of a quiz
router.get('/question/all/:id', auth, async (req, res) => {
    // quiz id
    const _id = req.params.id

    try {
        const quiz = await Quiz.findOne({
            _id
        })
        if (!quiz) {
            return res.status(404).send({
                error: "quiz not found!"
            })
        }
        
        await quiz.populate({
            path: 'question'
        }).execPopulate()

        res.send(quiz.question)
    } catch (error) {
        res.status(500).send()
    }
})

// Update question endpoints
router.patch('/question/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["question", "opt_1", "opt_2", "opt_3", "opt_4", "correct_opt", "explanation", "points"]
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        res.status(400).send({
            error: "invalid field is being updated!"
        })
    }
    // question_id id
    const _id = req.params.id

    try {
        const question = await Question.findOne({
            _id
        })
        if (!question) {
            return res.status(404).send({
                error: "question not found!"
            })
        }
        updates.forEach((update) => question[update] = req.body[update])
        await question.save()
        res.send(question)
    } catch (error) {
        res.status(500).send()
    }
})

// delete course endpoints
router.delete('/question/:id', auth, async (req, res) => {
    // question id
    const _id = req.params.id

    try {
        const question = await Question.findOneAndDelete({
            _id
        })

        if (!question) {
            return res.status(404).send({
                error: "quiz not found!"
            })
        }
        res.send(question)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router