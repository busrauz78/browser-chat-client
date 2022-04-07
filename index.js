const express = require('express');

const app = express();

app.use(express.static('assets'));

app.listen(3600, () => {
    console.log('Server is started..');
})