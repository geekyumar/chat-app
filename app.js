const express = require('express')
const path = require('path')
const app = express()
const conn = require('./app/config/mongoose')
const authRoutes = require('./routes/auth')
const multer = require('multer');

app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Middleware to handle form-data (including non-file fields)
const upload = multer({ dest: 'public/uploads/' });
app.use(upload.none()); 

// app routes
app.use('/auth', authRoutes)

app.listen('3000', ()=>{
    console.log("Server is listening on port 3000")
})