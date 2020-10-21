const express = require('express')
const router = new express.Router()
const Student = require('../model/student')
const auth = require('../middleware/auth_stu')

// Create endpoints 
router.post('/student/create', async (req, res) => {
    // console.log(req.body);
    const student = new Student(req.body)
    try {
        await student.save()
        const token = await student.generateAuthToken()
        res.status(201).send({
            student,
            token
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// Login endpoints
router.post('/student/login', async (req, res) => {
    try {
        const student = await Student.findByCredentials(req.body.email, req.body.password)
        student.tokens = []
        await student.save()
        const token = await student.generateAuthToken()
        res.send({
            name: student.name,
            token
        })
    } catch (error) {
        res.status(400).send({
            error: "Wrong Credentials!"
        })
    }
})

// Logout endpoints
router.post('/student/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            token.token !== req.token
        })
        await req.user.save()
        res.send({
            success: "Logout success!"
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
})

// Current student endpoints
router.get('/student/me', auth, async (req, res) => {
    res.send(req.user)
})

// Update student endpoints
router.patch('/student/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email","contact", "password","college"]
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    if (!isValid) {
        return res.status(400).send({
            error: "invalid field is being updated!"
        })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router