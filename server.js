const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')
const { rootCertificates } = require('tls')

let rollbar = new Rollbar({
    accessToken: '055ff42d2cb84f029a17e32eda8bcd4d',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const students = []
const app = express()
app.use(express.json())

app.use('/style', express.static('./public/style.css'))


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('student added successfully',{author: 'Devin'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('no name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exisits')
        res.status(400).send('that student already exists')
    }

})

const port = process.env.PORT || 4545
app.use(rollbar.errorHandler())

app.listen(port, ()=> console.log(`Take us to warp ${port}!`))