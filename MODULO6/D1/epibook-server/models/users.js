const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
}, {timestamps: true, strict: true})

module.exports = mongoose.model('UserModel', UsersSchema, 'users')