//Require packages...
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const ejs = require('ejs');

// require routes...
const authRoute = require('./routes/auth')
const quoteRoute = require('./routes/quote')

// Setup the application....
const app = express()
// Setup port...
const PORT = process.env.PORT || 5000;

// Setup view engine EJS, body-parser and express static...
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Setup session...
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

// initialize passport...
app.use(passport.initialize())
// use passport to deal with session...
app.use(passport.session())

// connect to database...
mongoose.connect(process.env.mongoDB_Connection)
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err))

// use routes...
app.use('/', authRoute)
app.use('/', quoteRoute)


app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}! Better Go Catch it!`)
})