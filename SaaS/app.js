const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');

const viewRouter = require('./router/viewRouter');
const questionRouter = require('./router/questionRouter');
const apiRouter = require('./router/apiRouter');
const mongoose = require('mongoose');
const config = require('./config.json');

let app = express();

let connectionString = process.env.PORT ? config.production.connectionString : config.development.connectionString;

let port = process.env.PORT ? process.env.PORT : config.development.port;

app.engine("handlebars", exhbs({ defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );
app.use(express.static(__dirname + "/public"));

app.use('/', viewRouter);
app.use('/question', questionRouter);
app.use('/api/question', apiRouter);

app.use(express.static(__dirname + '/public'));

mongoose.connect(connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connect db success");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Website is up");
  }
});
