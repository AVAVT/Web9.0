const express = require('express');
const router = express.Router();
const {getTestData, checkAnswers, getCorrectAnswers} = require('../controllers/testController');

router.get('/', (req, res) => {
  res.render("test", { testData : getTestData() });
});

// localhost:6969/test/answer
router.post('/answer', (req, res) => {
  res.render("result", {result: checkAnswers(req.body)});
});

router.post('/api/answer', (req, res) => {
  res.send({ score : checkAnswers(req.body), correctAnswers: getCorrectAnswers() });
});

module.exports = router;
