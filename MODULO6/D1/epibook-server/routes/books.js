const express = require('express');
const router = express.Router();
const Books = require('../models/books');

router.get('/books', async (req, res) => {
    try {
        const books = await Books.find()
        res.status(200).send(books)
    } 
    catch(error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
}) 

router.get('/books/bytitle/:title', async (req, res) => {
    const { title } = req.params
    try {
        const bookByTitle = await Books.find({
            title: {
                $regex: title, 
                $options: 'i'
            }
        })
        res.status(200).send(bookByTitle)
    } catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
})

router.post('/books', async (req, res) => {
    const books = new Books({
        category: req.body.category,
        img: req.body.img,
        price: req.body.price,
        title: req.body.title,
        description: req.body.description
    })

    try {
        const newBook = await books.save()
        res.status(200).send({
            message: 'Libro salvato con successo nel database',
            payload: newBook
        })    
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
})

router.delete('/books/:id', async (req, res) => {
    const {id} = req.params

    try {
        const book = await Books.findById(id).deleteOne()
        if(!book) {
            return res.status(404).send({
                message: 'Non esiste nessun libro con questo ID',
            })
        }

        res.status(200).send({
            message: 'Libro eliminato dal database',
        })
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
})

router.patch('/books/:id', async (req, res) => {
    const {id} = req.params
    const bookExist = await Books.findById(id)
    if(!bookExist){
        return res.status(404).send({
            message: 'Non esiste nessun libro con questo ID'
        })
    }

    try {
        const dataToUpdate = req.body 
        const option = {
            new: true
        }
        const result = await Books.findByIdAndUpdate(id, dataToUpdate, option)
        res.status(200).send({
            message: 'Libro aggiornato con successo',
            payload: result
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