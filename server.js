'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// DataBase
var JsonDB = require('node-json-db');
var db = new JsonDB("myDataBase", true, false);

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.get('/save/:key/:value', (req, res) => {
    db.push("/" + req.params.key, req.params.value)
    res.send("I write " + req.params.value + " under " + req.params.key)
});

app.get('/read/:key', (req, res) => {
    var value = db.getData("/" + req.params.key)
    res.send("I read " + value + " from " + req.params.key)
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);