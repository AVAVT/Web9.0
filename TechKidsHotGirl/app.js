const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exhbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const apiImage = require('./router/apiImagesRouter');
const apiUser = require('./router/apiUsersRouter');

let app = express();

app.engine("handlebars", exhbs({ defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );
app.use(session({
  secret: 'hotgirl',
  cookie: {},
  resave: false,
  saveUninitialized: true,
}));
app.use(cookieParser());

app.get('/', (req, res) => {
  //console.log(req);
  res.render("home", { username : req.session.username || req.cookies.username });
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
