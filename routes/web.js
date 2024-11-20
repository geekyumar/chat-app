const express = require('express')
const router = express.Router()
const { view } = require('../app/helpers/helpers')
const authMiddleware = require('../app/middlewares/authMiddleware')

router.get('/', authMiddleware, (req, res)=>{
    res.sendFile(view('index.html'))
})

module.exports = router