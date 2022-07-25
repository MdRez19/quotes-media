// Require mongoose
const mongoose = require('mongoose')

// Create User schema...
const quoteSchema = new mongoose.Schema({
        quote: String,
        bgColor: {
            type: 'string',
            default: '46244c'
        },
        likes: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Export User model
module.exports = mongoose.model('Quote', quoteSchema)