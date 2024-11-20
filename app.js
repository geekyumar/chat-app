const express = require('express')
const path = require('path')
const app = express()
const conn = require('./app/config/mongoose')
const authRoutes = require('./routes/auth')
const appRoutes = require('./routes/web')
const multer = require('multer');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const authMiddleware = require('./app/middlewares/authMiddleware')

app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Middleware to handle form-data (including non-file fields)
const upload = multer({ dest: 'public/uploads/' });
app.use(upload.none()); 

// app routes
app.use('/auth', authRoutes)
app.use('/', appRoutes)

app.listen('3000', ()=>{
    console.log("server is running on port 3000")
    console.log("app url: http://127.0.0.1:3000")
})