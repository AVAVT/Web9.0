const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/', (req, res) => {
  let question = questionController.getRandomQuestion((question) => {
    res.render(
      "question",
      {
        id: question.id,
        question: question.question,
        yes: question.yes,
        no: question.no
      }
    );
  });
});

router.get('/:id', (req, res) => {
  questionController.getQuestionById(req.params.id)
    .then(doc => { res.render("question", doc); })
    .catch(err => { res.redirect("/"); });
});

router.post('/', (req, res) => {
  questionController.addNewQuestion(req.body.question, (err, data) => {
    if(err)
      res.redirect('/');
    else
      res.redirect(`/question/${data._id}`);
  });
});

router.post('/:id', (req, res) => {
  let id = req.params.id;
  let answer = req.body.yes || req.body.no;

  questionController.updateQuestion(id, answer, (err, doc) => {
    console.log("after update", doc);
    res.redirect(`/question/${doc._id}`);
  });
});

module.exports = router;
