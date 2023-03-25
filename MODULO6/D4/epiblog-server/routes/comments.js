const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Posts = require('../models/posts');
const Comments = require('../models/posts');

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
            comment: req.body.comment,
            name: req.body.name,
            email: req.body.email
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
        const posts = await Posts.findById({_id: id });
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

//READ A SINGLE COMMENT OF A SINGLE POST  
router.get('/posts/:id/comments/:commentId', async (req, res) => {
    const {id, commentId} = req.params;

    try {
        const posts = await Posts.findById({_id: id });
        if(!posts){
            return res.status(404).send({
                message: 'Non esiste nessun post con questo ID'
            })
        }

        const comment = posts.comments.find(elem => elem._id.toString() === commentId);
        if(!comment){
            return res.status(404).send({
                message: 'Non esiste nessun commento con questo ID'
            })
        }
        
        res.status(200).send({    
            payload: comment
        });
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
});

//UPDATE COMMENT
router.patch('/posts/:id/comments/:commentId', async (req, res) => {
    const {id, commentId} = req.params;

    const posts = await Posts.findById(id);
    if(!posts){
        return res.status(404).send({
            message: 'Non esiste nessun post con questo ID'
        })
    }

    const comment = posts.comments.find(comment => comment._id.toString() === commentId);
    if (!comment) {
        return res.status(404).send({
            message: 'Non esiste nessun commento con questo ID'
        })
    }

    try {
        const dataToUpdate = req.body
        Object.assign(comment, dataToUpdate);
        await posts.save();

        res.status(200).send({
            message: 'Commento aggiornato con successo',
            payload: comment
        })
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
});

//DELETE COMMENT
router.delete('/posts/:id/comments/:commentId', async (req, res) => {
    const {id, commentId} = req.params;

    const post = await Posts.findById(id);
    if(!post){
        return res.status(404).send({
            message: 'Non esiste nessun post con questo ID'
        })
    }

    const index = post.comments.findIndex(comment => comment._id.toString() === commentId);
    if (index === -1) {
        return res.status(404).send({
            message: 'Non esiste nessun commento con questo ID'
        })
    }

    try {
        post.comments.splice(index, 1)
        await post.save();

        res.status(200).send({
            message: 'Commento eliminato con successo',
            payload: post
        })
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
});

/*
Comments.updateOne({
    _id: id
},
{
    $pull: {
        comments: {
            _id: commentId
        }
    }
}, (error) => {

}) */


module.exports = router