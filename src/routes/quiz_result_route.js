const express = require('express')
const router = new express.Router()
const quizResult = require('../model/quiz_result')
const auth = require('../middleware/auth_stu')

// Create and update endpoint of result
router.post('/result/create', auth, async (req, res) => {

    let result = await quizResult.findOne({
        quiz_id: req.body.quiz_id,
        student_id: req.user._id
    })

    try {
        if (!result) {
            result = new quizResult({
                ...req.body,
                student_id: req.user._id
            })
        }else{
            const updates = Object.keys(req.body)
            updates.forEach((update) => result[update] = req.body[update])
        }
        await result.save()
        res.status(201).send({
            result
        })
    } catch (error) {
        res.status(400).send({
            error
        })
    }
})

// finding all results realted to a student
router.get('/result/me', auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'quizResult',
            options: {
                sort: {
                    title: 1
                }
            }
        }).execPopulate()
        res.send(req.user.quizResult)
    } catch (error) {
        res.status(500).send({
            error
        })
    }
})

module.exports = router