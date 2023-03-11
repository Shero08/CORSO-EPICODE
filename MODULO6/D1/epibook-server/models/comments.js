const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({  
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true 
    },
    author: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        max: 255
    }
}, {timestamp: true, strict: true})

module.exports = mongoose.model('CommentsModel', CommentsSchema, 'comments')