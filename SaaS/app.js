const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');

const viewRouter = require('./router/viewRouter');
const questionRouter = require('./router/questionRouter');
const mongoose = require('mongoose');

let app = express();

app.engine("handlebars", exhbs({ defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', (req, res) => {
  res.render("home");
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + "/public/style.css");
});

app.get('/about', (req, res) => {
  res.render("about");
});

app.use('/ask', viewRouter);

app.use('/question', questionRouter);

mongoose.connect("mongodb://localhost/quyetde", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connect db success");
  }
});

app.listen(6969, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Website is up");
  }
});
