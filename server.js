const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '055ff42d2cb84f029a17e32eda8bcd4d',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

const port = process.env.PORT || 4545

app.listen(port, ()=> console.log(`Take us to warp ${port}!`))