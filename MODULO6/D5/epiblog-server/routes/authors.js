const express = require('express');
const router = express.Router();
const Authors = require('../models/authors');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


//READ ALL
router.get('/authors', async (req, res) => {
    try {
        const authors = await Authors.find();
        res.status(200).send(authors);
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
});


//READ SINGLE AUTHOR
router.get('/authors/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const authors = await Authors.findById(id);
        if(!authors){
            return res.status(404).send({
                message: 'Non esiste nessun autore con questo ID'
            })
        }
        
        res.status(200).send(authors);
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
});


//CREATE
router.post('/authors', async (req, res) => {
    const authors = new Authors({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        birth: req.body.birth,
        avatar: req.body.avatar
    })
    
    try {
        const newAuthor = await authors.save()
        res.status(200).send({
            message: 'Autore salvato con successo nel database',
            payload: newAuthor
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
router.delete('/authors/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const authors = await Authors.findById(id).deleteOne();

        if(!authors){
            return res.status(404).send({
                message: 'Non esiste nessun autore con questo ID'
            })
        }

        res.status(200).send({
            message: 'Autore eliminato con successo dal database'
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
router.patch('/authors/:id', async (req, res) => {
    const {id} = req.params;
    const authorExist = await Authors.findById(id);

    if(!authorExist){
        return res.status(404).send({
            message: 'Non esiste nessun autore con questo ID'
        })
    }

    try {
        const dataToUpdate = req.body
        const option = {
            new: true
        }
        const result = await Authors.findByIdAndUpdate(id, dataToUpdate, option);
        res.status(200).send({
            message: 'Autore aggiornato con successo',
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
router.get('/author', async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
  
    try {
      const authors = await Authors.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      const totalDocuments = await Authors.count();
      res.status(200).send({
        authors,
        totalPages: Math.ceil(count / limit),
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
      folder: 'avatars',
      allowedFormats: async (req, file) => ['png', 'jpg'],
      public_id: (req, file) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100)
        return (file.fieldname + '-' + uniqueSuffix)
      },
    },
});
   
const upload = multer({ storage: storage });

//UPLOAD IMAGE
router.post('/upload', upload.single('image'), async (req, res) => {
  console.log(req.file);
  
  try {
    res.status(200).json({
        message: 'Caricamento immagine avvenuto con successo.', 
        upload: req.file.path
    })
  } 
  catch (error) {
    res.status(500).send({
        message: 'Errore interno del server',
        error: error
    })
  }
});


//UPLOAD IMAGE AVATAR AND UPDATE AUTHOR'S AVATAR
router.patch('/authors/:id/avatar', upload.single('image'), async (req, res) => {
    console.log(req.file);
    const {id} = req.params;
    const authorExist = await Authors.findById(id);

    if(!authorExist){
        return res.status(404).send({
            message: 'Non esiste nessun autore con questo ID'
        })
    }

    try {
        const result = await Authors.findByIdAndUpdate(id, {
            $set: {
                avatar: req.file.path
            }
        }, { new: true });
        
        res.status(200).send({
            message: 'Autore aggiornato con successo',
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