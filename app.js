const express = require('express')
const path = require('path')
const app = express()
const conn = require('./app/config/mongoose')
const authRoutes = require('./routes/auth')
const appRoutes = require('./routes/web')
const chatRoutes = require('./routes/chat')
const { view } = require('./app/helpers/helpers')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const multer = require('multer');
const http = require('http')
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server, {
    path: '/chat',
  });
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const { authMiddleware, loginMiddleware } = require('./app/middlewares/authMiddleware')

app.use(express.static(path.join(__dirname, 'public/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Middleware to handle form-data (including non-file fields)
const upload = multer({ dest: 'public/uploads/' });
app.use(upload.none()); 

// app routes
app.use('/auth', authRoutes)
app.use('/', appRoutes)

chatRoutes(io)
// app.listen('3000', ()=>{
//     console.log("server is running on port 3000")
//     console.log("app url: http://127.0.0.1:3000")
// })

server.listen('3000', ()=>{
    console.log("server is running on port 3000")
    console.log("app url: http://127.0.0.1:3000")
})