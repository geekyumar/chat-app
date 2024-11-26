const express = require('express')
const router = express.Router()
const { view } = require('../app/helpers/helpers')
const { authMiddleware, loginMiddleware } = require('../app/middlewares/authMiddleware')

router.get('/', authMiddleware, (req, res)=>{
    res.sendFile(view('index.html'))
})

router.get('/chat', authMiddleware, (req, res)=>{
    res.render('chat', {message: "Chat Application"})
})

module.exports = router