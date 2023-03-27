const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const Authors = require('../models/authors');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY) 

//READ ALL
router.get('/posts', async (req, res) => {
    try {
        const posts = await Posts.find().populate('Authors');
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

//CREATE NEW
router.post('/posts', async (req, res) => {
    const { author } = req.body
    const findAuthor = await Authors.findById(author)

    if(!author){
        return res.status(400).send("Autore non trovato")
    }

    const posts = new Posts({
        category: req.body.category,
        title: req.body.title,
        cover: req.body.cover,
        readTime: {
            value: req.body.readTime.value,
            unit: req.body.readTime.unit
        },
        author: findAuthor._id,
        content: req.body.content
    })

    //CREATE MAIL FOR POSTS
    const msg = {
        to: findAuthor.email, 
        from: 'carlocap92@libero.it', 
        subject: 'Hai pubblicato un nuovo post!',
        text: 'Hai pubblicato un nuovo post, per leggerlo visita il sito',
        html: '<strong>Hai pubblicato un nuovo post, per leggerlo visita il sito</strong>', 
    }
    
    try {
        const newPost = await posts.save()
        res.status(200).send({
            message: 'Post salvato con successo nel database',
            payload: newPost
        })

        const mail = await sgMail.send(msg)
        console.log(mail)
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


//CONFIG STORAGE CLOUDINARY
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'posts',
      allowedFormats: async (req, file) => ['png', 'jpg'],
      public_id: (req, file) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100)
        return (file.fieldname + '-' + uniqueSuffix)
      },
    },
});
   
const upload = multer({ storage: storage });

//UPLOAD IMAGE COVER AND UPDATE POSTS'S COVER
router.patch('/posts/:id/cover', upload.single('image'), async (req, res) => {
    console.log(req.file);
    const {id} = req.params;
    const authorExist = await Posts.findById(id);

    if(!authorExist){
        return res.status(404).send({
            message: 'Non esiste nessun post con questo ID'
        })
    }

    try {
        const result = await Posts.findByIdAndUpdate(id, {
            $set: {
                cover: req.file.path
            }
        }, { new: true });
        
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


module.exports = router