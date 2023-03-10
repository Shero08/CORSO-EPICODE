const express = require('express');
const router = express.Router();
const Comments = require('../models/comments');

router.get('/comments', async (req, res) => {
    try {
        const comments = await Comments.find()
        res.status(200).send(comments) 
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
})

router.post('/comments', async (req, res) => {
    console.log(req.body)
    const comment = new Comments({
        bookId: req.body.bookId,
        author: req.body.author,
        rate: req.body.rate,
        comment: req.body.comment
    })

    try {
        const newComment = await comment.save()
        res.status(200).send({
            message: 'Nuovo commento inserito con successo',
            payload: newComment
        })    
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
})

module.exports = router