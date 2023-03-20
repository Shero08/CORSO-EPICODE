const express = require('express');
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).send('Accesso non autorizzato o token mancante')
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()    
    } 
    catch (error) {
        return res.status(400).send('token non valido o scaduto')
    }
}

router.post('/login', async (res, req) => {
    const user = await User.find({
        email: req.body.email
    })

    if(!user){
        return res.status(400).send('Utente non trovato')
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword){
        return res.status(400).send('Password errata')
    }

    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '15m'})
    res.header('Authorization', token).status(200).send({
        email: user.email,
        token
    })
})

router.post('/refresh-token', verifyToken, async (req, res) => {
    const user = await User.find({
        email: req.body.email
    })

    if(!user){
        return res.status(400).send('Utente non trovato')
    }

    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '15m'})
    res.header('Authorization', token).status(200).send({
        token
    })
})

module.exports = router
