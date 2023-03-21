const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');

//READ ALL
router.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).send(posts);
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
});
 

//READ SINGLE POST
router.get('/posts/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const posts = await Posts.findById(id);
        if(!posts){
            return res.status(404).send({
                message: 'Non esiste nessun post con questo ID'
            })
        }
        
        res.status(200).send(posts);
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
});


//CREATE
router.post('/posts', async (req, res) => {
    const posts = new Posts({
        category: req.body.category,
        title: req.body.title,
        cover: req.body.cover,
        readTime:{
            value: req.body.readTime.value,
            unit: req.body.readTime.unit
        },
        author:{
            name: req.body.author.name,
            avatar: req.body.author.avatar
        },
        content: req.body.content
    })
    
    try {
        const newPost = await posts.save()
        res.status(200).send({
            message: 'Post salvato con successo nel database',
            payload: newPost
        })
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
})


//DELETE
router.delete('/posts/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const posts = await Posts.findById(id).deleteOne();

        if(!posts){
            return res.status(404).send({
                message: 'Non esiste nessun post con questo ID'
            })
        }

        res.status(200).send({
            message: 'Post eliminato con successo dal database'
        })
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
});


//UPDATE
router.patch('/posts/:id', async (req, res) => {
    const {id} = req.params;
    const postExist = await Posts.findById(id);

    if(!postExist){
        return res.status(404).send({
            message: 'Non esiste nessun post con questo ID'
        })
    }

    try {
        const dataToUpdate = req.body
        const option = {
            new: true
        }
        const result = await Posts.findByIdAndUpdate(id, dataToUpdate, option);
        res.status(200).send({
            message: 'Post aggiornato con successo',
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

//PAGINATION
router.get('/pagination', async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
  
    try {
      const posts = await Posts.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      const totalDocuments = await Posts.count();
      const totalPages = Math.ceil(totalDocuments / limit);
      res.status(200).send({
        posts,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
});


module.exports = router