const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

let html = fs.readFileSync('../dist/index.html', 'utf-8');

app.get('../dist/index.html', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(html);
});

app.use(express.static('../dist'));

app.listen(port);
