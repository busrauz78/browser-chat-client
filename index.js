const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const messages = [];

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/messages', (req, res) => {
  res.status(200).send(messages);
});

app.post('/messages', (req,res) => {
  messages.push(req.body);
  res.sendStatus(200);
});

app.get('*', (req,res) => {
  res.status(404).send('Page is not found!');
});

app.listen(3600, () => {
    console.log('Server is started..');
})