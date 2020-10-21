const express = require('express')
const router = new express.Router()
const Course = require('../model/course')
const Quiz = require('../model/quiz')
const auth = require('../middleware/auth')

// Create endpoints 
router.post('/course/create', auth, async (req, res) => {
    const course = new Course({
        ...req.body,
        teacher_id: req.user._id
    })
    try {
        await course.save()
        // making quiz of that course
        const quiz = new Quiz({
            course_name: course.title,
            course_id: course._id,
            teacher_id: req.user._id
        })
        await quiz.save()

        res.status(201).send({
            course,
            quiz
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// finding all course realted to a teacher
router.get('/course/me', auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'course',
            options: {
                sort: {
                    title: 1
                }
            }
        }).execPopulate()
        res.send(req.user.course)
    } catch (error) {
        res.status(500).send(error)
    }
})

// dev route getting all course
router.get('/course/all', async (req, res) => {
    try {
        const course = await Course.find({}).sort({title: 1})
        res.send(course)
    } catch (error) {
        res.status(500).send();
    }
})

// update course endpoints
router.patch('/course/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["title", "description", "credit"]
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        res.status(400).send({
            error: "invalid field is being updated!"
        })
    }
    // course id
    const _id = req.params.id

    try {
        const course = await Course.findOne({
            _id,
            teacher_id: req.user._id
        })
        if (!course) {
            return res.status(404).send()
        }
        updates.forEach((update) => course[update] = req.body[update])
        await course.save()
        res.send(course)
    } catch (error) {
        res.status(500).send()
    }
})

// deleting course by id
router.delete('/course/:id', auth, async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({
            _id: req.params.id,
            teacher_id: req.user._id
        })

        if (!course) {
            res.status(404).send({
                error: "No course found!"
            })
        }

        const quiz = await Quiz.findOneAndDelete({
            course_id: course.id,
            teacher_id: req.user._id
        })

        res.send({
            course,
            quiz
        })
    } catch (error) {
        res.status(500).send({error})
    }
})

module.exports = router