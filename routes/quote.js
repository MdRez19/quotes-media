// require express route...
const router = require('express').Router();

// require Quote model...
const Quote = require('../models/Quote')

// create routes...
// get home...
router.get('/', (req, res) => {
    // let's check if user logged in?
    // then when the user access this route it will redirect to create-quote page automatically...
    if (req.isAuthenticated) {
        res.redirect('/create-quote')
    } else {
        res.render('index')
    }
})

// get sing up page...
router.get('/signup', (req, res) => {
    // let's check if user logged in?
    // then when the user access this route it will redirect to create-quote page automatically...
    if (req.isAuthenticated) {
        res.redirect('/create-quote')
    } else {
        res.render('partials/signup')
    }
})

// login page...
router.get('/login', (req, res) => {
    if (req.isAuthenticated) {
        res.redirect('/create-quote')
    } else {
        res.render('partials/login')
    }
})

// get quotes page (fetch date from DB and send to quote page)...
router.get('/quotes', async (req, res) => {
    try {
        //    fetch all quotes from DB...
        const allQuotes = await Quote.find();
        res.render('partials/quotes', {allQuotes, isAuth: req.isAuthenticated})
    } catch (err) {
        res.send(err)
    }
})

// get submit page...
router.get('/create-quote', (req, res) => {
    if (req.isAuthenticated) {
        res.render('partials/create-quote')
    } else {
        res.redirect('/signup')
    }
})

// create a quote and add data to database...
router.post('/create-quote', (req, res) => {
    try {
        const quote = new Quote({
            quote: req.body.quote,
            bg_color: req.body.bg_color.substring(1) // because color will send in hex format (#eeeee), so need to remove #...
        });
        //    save quote in DB...
        const saveQuote = quote.save();
        //    redirect to quotes_js if success
        !saveQuote && res.redirect('/create-quote');
        res.redirect('/quotes')
    } catch (err) {
        res.send(err)
    }
})

// export module...
module.exports = router;


