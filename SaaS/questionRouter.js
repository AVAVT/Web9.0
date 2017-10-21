const express = require('express');
const router = express.Router();
const questionController = require('./questionController');

router.get('/', (req, res) => {
  let question = questionController.getRandomQuestion();

  res.render("question",
    {
      id: question.id,
      question: question.question,
      yes: question.yes,
      no: question.no
    });
});

router.get('/:id', (req, res) => {
  let question = questionController.getQuestionById(req.params.id);

  if (question) {
    res.render("answer", question);
  } else {
    res.redirect("/");
  }
});

router.post('/', (req, res) => {
  let newQuestionId = questionController.addNewQuestion(req.body.question);

  res.redirect(`/question/${newQuestionId}`);
});

router.post('/:id', (req, res) => {
  let id = req.params.id;

  if (req.body.yes) {
    questionController.updateQuestion(id, "yes");
  } else if (req.body.no) {
    questionController.updateQuestion(id, "no");
  }

  res.redirect(`/question/${id}`);
});

module.exports = router;
