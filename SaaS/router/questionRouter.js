const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/', (req, res) => {
  questionController.getRandomQuestion((err, question) => {
    if (err) {
      res.redirect("/");
    } else {
      res.render("question", question);
    }
  });
});

router.get('/:id', (req, res) => {
  questionController.getQuestionById(req.params.id)
    .then(doc => { res.render("answer", doc); })
    .catch(err => { res.redirect("/"); });
});

router.post('/', (req, res) => {
  questionController.addNewQuestion(req.body.question, (err, question) => {
    if (err) {
      res.redirect("/");
    } else {
      res.redirect(`/question/${question.id}`);
    }
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
