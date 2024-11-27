const express = require('express')
const router = express.Router()
const { view } = require('../app/helpers/helpers')
const authController = require('../app/controllers/authController')
const { authMiddleware, loginMiddleware } = require('../app/middlewares/authMiddleware')

router.get('/signup', loginMiddleware, (req, res)=>[
    res.sendFile(view('auth/signup.html'))
])

router.get('/login', loginMiddleware, (req, res)=>[
    res.sendFile(view('auth/login.html'))
])

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)


module.exports = router