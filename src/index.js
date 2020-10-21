const express = require('express')
const path = require('path')
require('./db/mongoose')
const teacherRoute = require('./routes/teacher_route')
const courseRoute = require('./routes/course_route')
const quizRoute = require('./routes/quiz_route')
const questionRoute = require('./routes/question_route')
const studentRoute = require('./routes/student_route')
const quizResultRoute = require('./routes/quiz_result_route')


const app = express()
const port = process.env.PORT

// serving public folder
const pubdir = path.join(__dirname, '../public')
app.use(express.static(pubdir))

// routes
app.use(express.json())

// module 1 routes
app.use(teacherRoute)
app.use(courseRoute)
app.use(quizRoute)
app.use(questionRoute)

// module 2 routes
app.use(studentRoute)
app.use(quizResultRoute)


// server start
app.listen(port, () => {
    console.log('Server is up on port ', port)
})