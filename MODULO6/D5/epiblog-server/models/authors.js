const mongoose = require('mongoose');

const AuthorsSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('AuthorsModel', AuthorsSchema, 'Authors');