const express = require('express');
const path = require('path');
const fileController = require('./fileController');
const outputFileName = "test.json";

let app = express();
app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname,"../index.html"));
});

app.get('/about', (req, res) => {
  res.send("I'm Long");
});

app.get('/question', (req, res) => {
  res.send("Question");
});

app.get('/testhtml', (req, res) => {
  let test = 5;
  let es5String = "abc " + test.toString() + "adas";
  let es6String = `abc + ${test} + "adas`;
  console.log(es6String);
  res.send("<h1>Test html</h1><ul><li>1</li><li>2</li></ul>");
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
