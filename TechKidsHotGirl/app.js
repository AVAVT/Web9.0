const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exhbs = require('express-handlebars');

const apiImage = require('./router/apiImagesRouter');
const apiUser = require('./router/apiUsersRouter');

const imagesController = require('./controllers/imagesController');

let app = express();

app.engine("handlebars", exhbs({ defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );

app.get('/', (req, res) => {
  imagesController.getAllCookImage((err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      console.log(data);
      res.render("home", {images: data})
    }
  });
});

app.use('/api/images', apiImage);
app.use('/api/users', apiUser);
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost/techkidshotgirl", (err) => {
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
