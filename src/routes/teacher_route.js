const express = require('express')
const router = new express.Router()
const Teacher = require('../model/teacher')
const auth = require('../middleware/auth')

// Create endpoints 
router.post('/teacher/create', async (req, res) => {
    // console.log(req.body);
    const teacher = new Teacher(req.body)
    try {
        await teacher.save()
        const token = await teacher.generateAuthToken()
        res.status(201).send({
            teacher,
            token
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// Login endpoints
router.post('/teacher/login', async (req, res) => {
    try {
        const teacher = await Teacher.findByCredentials(req.body.email, req.body.password)
        teacher.tokens = []
        await teacher.save()
        const token = await teacher.generateAuthToken()
        res.send({
            // teacher,
            token
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// Logout endpoints
router.post('/teacher/logout', auth, async (req, res) => {
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

// Current teacher endpoints
router.get('/teacher/me', auth, async (req, res) => {
    res.send(req.user)
})

// Update teacher endpoints
router.patch('/teacher/me', auth, async (req, res) => {
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


// dev route getting all teachers
router.get('/teacher/all', async (req, res) => {
    try {
        const teacher = await Teacher.find({})
        res.send(teacher)
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router