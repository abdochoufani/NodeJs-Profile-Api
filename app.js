const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')


const keys = require('./config/keys')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

//load express
const app = express()

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//DB Config using mongoose
mongoose
    .connect(keys.mongoURI, { useNewUrlParser: true })
    .then((db) => {
        console.log('MongoDB Connected to  Database', db)
    })
    .catch(err => console.log(`An error was encountered, details: ${err}`));

//passport middleware
app.use(passport.initialize())

//passport config
require('./config/passport')(passport)
//connect routes to server
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)


//create port
const port = process.env.PORT || 5000


//connect server to port 5000
app.listen(port, () => console.log(`server running on port ${port}`))