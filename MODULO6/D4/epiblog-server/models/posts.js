const mongoose = require('mongoose');
const authors = require('../models/authors');

const CommentsSchema = new mongoose.Schema({
    comment: {
        type: String
    }
}, {timestamps: true, strict: true})

const PostsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    readTime: {
        value: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "Authors"
    },
    content: {
        type: String,
        required: true
    },
    comments: [CommentsSchema]
}, {timestamps: true, strict: true})

module.exports = mongoose.model('PostsModel', PostsSchema, 'Posts');