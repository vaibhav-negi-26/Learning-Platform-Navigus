const express = require('express')
const path = require('path')
require('./db/mongoose')
const teacherRoute = require('./routes/teacher_route')
const courseRoute = require('./routes/course_route')


const app = express()
const port = process.env.PORT

// serving public folder
const pubdir = path.join(__dirname, '../public')
app.use(express.static(pubdir))

// routes
app.use(express.json())
app.use(teacherRoute)
app.use(courseRoute)

// server start
app.listen(port, () => {
    console.log('Server is up on port ', port)
})