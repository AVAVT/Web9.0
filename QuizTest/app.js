const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

let app = express();

app.engine("handlebars", handlebars({ defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );

app.use(express.static(__dirname + '/public'));

app.listen(6969, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Localhost started on port 6969");
  }
});