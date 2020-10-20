const express = require('express')
const router = new express.Router()
const Teacher = require('../model/teacher')

// Create and login endpoints 
router.post('/teacher/create', async (req, res) => {
    console.log(req.body);
    const teacher = new Teacher(req.body)
    try {
        await teacher.save()
        res.status(201).send({
            teacher
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// dev route getting current users
router.get('/teacher/all', async (req, res) => {
    try {
        const teacher = await Teacher.find({})
        res.send(teacher)
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router