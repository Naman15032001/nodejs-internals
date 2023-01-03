const parseJSON = require('./parseJson');

const express = require('express');

const app = express();

// app.use(parseJSON());

app.post('/',parseJSON, (req, res) => {
    res.send(req.body);
})

app.listen(3000, () => {
    console.log('listening to port 3000');
})