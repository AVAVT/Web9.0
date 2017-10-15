const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');

const fileController = require('./fileController');
const viewRouter = require('./viewRouter');
const questionRouter = require('./questionRouter');

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

app.listen(6969, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Website is up");
  }
});
