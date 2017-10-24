const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');

const viewRouter = require('./router/viewRouter');
const questionRouter = require('./router/questionRouter');
const apiRouter = require('./router/apiRouter');
const mongoose = require('mongoose');

let app = express();

app.engine("handlebars", exhbs({ defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );
app.use(express.static(__dirname + "/public"));

app.use('/', viewRouter);

app.use('/question', questionRouter);

app.use('/api/question', apiRouter);

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
