const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public/')));

function view(dir){
    return path.join(__dirname, "views/", dir)
}

app.get('/signup', (req, res)=>{
    res.sendFile(view("auth/signup.html"))
})

app.get('/login', (req, res)=>{
    res.sendFile(view("auth/login.html"))
})

app.listen('3000', ()=>{
    console.log("Server is listening on port 3000")
    console.log(__dirname)
})