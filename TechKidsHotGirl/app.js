const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const apiImage = require('./router/apiImagesRouter');
const apiUser = require('./router/apiUsersRouter');

let app = express();

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );
app.use(express.static(__dirname + "/public"));

app.use('/api/images', apiImage);
app.use('/api/users', apiUser);

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
