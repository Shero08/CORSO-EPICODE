const express = require('express');
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if(!user){
        return res.status(404).send('Email non trovata o non corretta')
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword){
        return res.status(404).send('Password non valida')
    }

    res.status(200).send({
        email: user.email,
        username: user.username
    })
})

module.exports = router
