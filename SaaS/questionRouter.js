const express = require('express');
const router = express.Router();
const fileController = require('./fileController');
const outputFileName = "question.json";

router.get('/', (req, res) => {
  //TO DO
  //get 1 random question
  //render question with template
  let questionList = fileController.readDataFromFile(outputFileName);

  let question = questionList[0];

  res.render("question",
    {
      question: question.question,
      yes: question.yes,
      no: question.no,
      layout: "test"
    });
});

//TO DO get question with id
//localhost:6969/question/:id
router.get('/:question', (req, res) => {
  console.log(req.query);
  res.send(req.params);
});

router.post('/', (req, res) => {
  let questionList = [];
  try {
    questionList = fileController.readDataFromFile(outputFileName);
  } catch (ex) {
    console.log(ex);
    //questionList = [];
  }

  let newQuestion = {
    question : req.body.question,
    yes: 0,
    no: 0
  };
  questionList.push(newQuestion);
  fileController.writeDataToFile(outputFileName, questionList);
  res.redirect('/');
});

module.exports = router;
