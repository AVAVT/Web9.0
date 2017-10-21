const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render("ask");
});

router.get('/question', (req, res) => {
  res.send("Question");
});

router.post('/question', (req, res) => {
  res.redirect('/');
})

module.exports = router;
