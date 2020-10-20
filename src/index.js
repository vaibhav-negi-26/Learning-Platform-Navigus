const express = require('express')
const path  = require('path')


const app = express()
const port = process.env.PORT || 3000

// serving public folder
const pubdir = path.join(__dirname,'../public')
app.use(express.static(pubdir))

// routes
app.get('/hi',(req,res) => {
    res.send('Hello Express!!')
})

// server start
app.listen(port,() => {
    console.log('Server is up on port ',port)
})