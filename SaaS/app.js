const express = require('express');
const path = require('path');
const fileController = require('./fileController');
const outputFileName = "test.json";

let app = express();
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get('/about', (req, res) => {
  res.send("Web 9.0");
});

app.get('/question', (req, res) => {
  res.send("Question");
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + "/public/style.css");
});

app.listen(6969, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Website is up");
  }
});
