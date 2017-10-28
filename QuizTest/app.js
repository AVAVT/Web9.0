const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const { getTestData, checkAnswers, getCorrectAnswers } = require('./controllers/testController');


let app = express();

app.engine("handlebars", handlebars({ defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended : true }) );
app.use(bodyParser.json({ extended: true }) );

// http://localhost:6969/
app.get('/', (req, res) => {
  res.render("test", { testData : getTestData() });
});

app.post('/answer', (req, res) => {
  res.render("result", {result: checkAnswers(req.body)});
});

app.post('/api/answer', (req, res) => {
  res.send({ score : checkAnswers(req.body), correctAnswers: getCorrectAnswers() });
});

app.use(express.static(__dirname + '/public'));

app.listen(6969, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Localhost started on port 6969");
  }
});