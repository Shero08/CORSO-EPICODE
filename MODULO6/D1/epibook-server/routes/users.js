const express = require('express');
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } 
    catch(error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
})

router.post('/users', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const users = new User({
        email: req.body.email,
        password: hashPassword,
        username: req.body.username
    })

    try {
        const newUser = await users.save()
        res.status(200).send({
            message: 'Utente salvato con successo nel database',
            payload: newUser
        })    
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
})

router.delete('/users/:id', async (req, res) => {
    const {id} = req.params

    try {
        const user = await User.findById(id).deleteOne()
        if(!user) {
            return res.status(404).send({
                message: 'Non esiste nessun utente con questo ID',
            })
        }

        res.status(200).send({
            message: 'Utente eliminato dal database',
        })
    } 
    catch (error) {
        res.status(500).send({
            message: 'Errore interno del server',
            error: error
        })
    }
})

router.patch('/users/:id', async (req, res) => {
    const {id} = req.params
    const userExist = await User.findById(id)
    if(!userExist){
        return res.status(404).send({
            message: 'Non esiste nessun utente con questo ID'
        })
    }

    try {
        const dataToUpdate = req.body
        const option = {
            new: true
        }
        const result = await User.findByIdAndUpdate(id, dataToUpdate, option)
        res.status(200).send({
            message: 'Utente aggiornato con successo',
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