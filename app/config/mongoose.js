const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@chat-app.7cu5q.mongodb.net/?retryWrites=true&w=majority&appName=chat-app`, {
})
.then(() => console.log('MongoDB connected')
)
.catch(err => console.log(err));

const db = mongoose;

module.exports = mongoose;