const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '055ff42d2cb84f029a17e32eda8bcd4d',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const students = []
const app = express()
app.use(express.json())


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.post('/api/student',(req,res)=>{
    let {name} = req.body
    name = name.trim()
    
    students.push(name)
    
    rollbar.log('Student added successfully', {author: 'Devin', type: 'manual entry' })
    
    res.status(200).send(students)
})

const port = process.env.PORT || 4545
app.use(rollbar.errorHandler())

app.listen(port, ()=> console.log(`Take us to warp ${port}!`))