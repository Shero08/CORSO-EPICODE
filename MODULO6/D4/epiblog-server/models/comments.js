const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    comment: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('CommentsModel', CommentsSchema, 'Comments');