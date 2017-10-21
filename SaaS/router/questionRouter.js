const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const questionController = require('../controllers/questionController');

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

router.get('/test', (req, res) => {
  testPromise()
    .then(questionList => res.send(questionList))
    .catch(err => res.send(err));
});


router.get('/:id', (req, res) => {
  questionController.getQuestionById(req.params.id)
    .then(doc => { res.render("question", doc); })
    .catch(err => { res.redirect("/"); });
});

const testPromise = () => {
  return new Promise(function(resolve, reject) {
    try {
      let questionList = fileController.readDataFromFile("test");
      console.log("resolve");
      resolve(questionList);
    }
    catch (ex) {
      console.log("reject");
      reject(ex);
    }
  });
}

router.post('/', (req, res) => {
  questionController.addNewQuestion(req.body.question, res);
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
