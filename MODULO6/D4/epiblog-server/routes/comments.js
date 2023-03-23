const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Posts = require('../models/posts');

// Parse JSON request bodies
router.use(bodyParser.json());

//CREATE COMMENTS BY EMBEDDING METHOD:
router.post('/posts/:id/comments', async (req, res) => {
    const {id} = req.params;
    const postExist = await Posts.findById(id);

    if(!postExist){
        return res.status(404).send({
            message: 'Non esiste nessun post con questo ID'
        })
    }

    try {
        const newComment = {
            comment: req.body.comment
        };
        console.log(newComment);
        postExist.comments.push(newComment)
        const result = await postExist.save();
        res.status(200).send({
            message: 'Commento inserito con successo',
            payload: result
        })
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
});

//READ COMMENTS OF A SINGLE POST
router.get('/posts/:id/comments', async (req, res) => {
    const {id} = req.params;

    try {
        const posts = await Posts.findById(id);
        if(!posts){
            return res.status(404).send({
                message: 'Non esiste nessun post con questo ID'
            })
        }
        
        res.status(200).send(posts.comments);
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
});


module.exports = router