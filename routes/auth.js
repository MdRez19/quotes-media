// require express router, passport...
const router = require('express').Router();
const passport = require('passport');

// Require User model...
const User = require('../models/User')

// Create passport Local strategy...
passport.use(User.createStrategy());

// Serialize and deserialize user...
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Register the user in DB
router.post('/auth/signup', async (req, res) => {
    try {
        //  Register user...
        const registerUser = await User.register({username: req.body.username}, req.body.password)
        if (registerUser) {
            passport.authenticate('local')(req, res, () => {
                res.redirect('create-quote')
            })
        } else {
            res.redirect('signup')
        }
    } catch (err) {
        res.send(err)
    }
})

// Login user...
router.post('/auth/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    // Using password login method we will check if user credentials are correct or not...
    req.login(user, (err) => {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('create-quote')
            })
        }
    })
})

// Logout user...
router.get('/auth/logout', (req, res) => {
//    use passport logout method...
    req.logout(() => {
        res.redirect('/')

    })
})

// export router
module.exports = router;







