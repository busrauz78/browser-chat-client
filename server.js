const bodyParser = require('body-parser');
const { url } = require('./dbConfig');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const dbUrl = url;

// Model
const Message = mongoose.model('Message', {
  name: String,
  message: String,
});

// Export client with express
app.use(express.static('client'));

// Parser for request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Requests
app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(messages);
    }
  })
});
app.post('/messages', (req,res) => {
  const message = new Message(req.body);
  message.save((err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      io.emit('message', req.body);
      res.sendStatus(200);
    }
  })
  
});
app.get('*', (req,res) => {
  res.status(404).send('Page is not found!');
});

// Socket connection
io.on('connection', (socket) => {
  console.log('User is connected..');
});

// Db connection
mongoose.connect(dbUrl ,(err) => {
  console.log('Db connection is successfull', err);
});

// Server connection
http.listen(3600, () => {
    console.log('Server is started..');
})
