const express = require('express')
const router = express.Router()
const { view } = require('../app/helpers/helpers')
const authController = require('../app/controllers/authController')
const authMiddleware = require('../app/middlewares/authMiddleware')

router.get('/signup', (req, res)=>[
    res.sendFile(view('auth/signup.html'))
])

router.get('/login', (req, res)=>[
    res.sendFile(view('auth/login.html'))
])

router.post('/signup', authController.signup)
router.post('/login', authController.login)

module.exports = router