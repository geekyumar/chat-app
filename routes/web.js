const express = require('express')
const router = express.Router()
const { view } = require('../app/helpers/helpers')
const { authMiddleware, loginMiddleware } = require('../app/middlewares/authMiddleware')
const users = require('../models/users')

router.get('/', authMiddleware, (req, res)=>{
    res.sendFile(view('index.html'))
})

router.get('/chat', authMiddleware, async (req, res)=>{
    const userDetails = await users.findOne({username: 'umar'});
    if(!userDetails){
        res.send('200', 'User not found!')
    }
    res.render('chat', {data: userDetails, chats: ["Umar Farooq", "Karthick", "Sadagopan"]})
})

module.exports = router