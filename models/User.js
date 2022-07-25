// Require mongoose, passport-local-mongoose
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

// Create User schema...
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Hash password using passport-local-mongoose plugin...
userSchema.plugin(passportLocalMongoose)

// Export User model
module.exports = mongoose.model('User', userSchema)


