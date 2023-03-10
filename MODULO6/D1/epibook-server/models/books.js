const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        max: 15,
    },
    img: {
        type: String,
        required: true,
        max: 15,
    },
    price: {
        type: Number,
        decimal: true,
        required: true,
    },
    title: {
        type: String,
        required: true,
        max: 30,
    },
    description: {
        type: String,
        required: true,
        max: 255,
    }
}, { timestamp: true, strict: true })

module.exports = mongoose.model('BooksModel', BooksSchema, 'books')