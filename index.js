const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const messages = [];

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/messages', (req, res) => {
  res.status(200).send(messages);
});

app.post('/messages', (req,res) => {
  messages.push(req.body);
  io.emit('message', req.body);
  res.sendStatus(200);
});

app.get('*', (req,res) => {
  res.status(404).send('Page is not found!');
});

io.on('connection', (socket) => {
  console.log('User is connected..');
});

http.listen(3600, () => {
    console.log('Server is started..');
})