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

app.get('/setup', (req, res) => {
    db.delete("/");
    db.push("/users[]", { "id": "k", "name": "K", "real_name": "KK", });
    db.push("/questions[]", {
        "id": "1",
        "author_id": "k",
        "question": "Pierwsze pytanie testowe",
        "answers": [
            { "id": "1", "answer": "Tak", "responders": ["k"] },
            { "id": "2", "answer": "Nie", "responders": [] }
        ]
    });
    res.send('I\'m ready');
});

app.get('/users', (req, res) => {
    var value = db.getData("/users")
    res.send(value)
});

app.get('/users/:key', (req, res) => {
    var users = db.getData("/users");
    var i;
    var len = users.length;
    for (i = 0; i < len; i++) {
        if (users[i]["id"] == req.params.key) {
            res.send(users[i])
            break;
        }
    } 
    res.status(500).send("Item not found");
});

app.get('/questions', (req, res) => {
    var value = db.getData("/questions")
    res.send(value)
});

app.get('/questions/:key', (req, res) => {
    var questions = db.getData("/questions");
    var i;
    var len = questions.length;
    for (i = 0; i < len; i++) {
        if (questions[i]["id"] == req.params.key) {
            res.send(questions[i])
            break;
        }
    } 
    res.status(500).send("Item not found");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);