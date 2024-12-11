module.exports = (io) => {
  // const express = require('express')
  // const router = express.Router()
  // const chatServer = require('http').createServer()
  // const { Server } = require('socket.io')

  // const io = new Server(chatServer, {
  //   path: '/chat'
  // })

  const { socketMiddleware } = require('../app/middlewares/authMiddleware')

  io.use(socketMiddleware)

    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      socket.on('send_message', (data) => {
        console.log('Received:', data);
  
        io.emit('receive_message', data);
      });
      
      socket.on('typing', ()=>{
        console.log(`User ${socket.id}: typing..`)
        socket.emit('typing', {message: "typing.."})
      })
  
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  };