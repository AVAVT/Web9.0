const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/:id', (req, res) => {
  if (req.body.like) {
    questionController.updateLikeQuestion(req.params.id, (err, doc) => {
      if (err) {
        res.redirect("/");
      } else {
        res.send({ likes : doc.likes });
      }
    })
  } else {
    res.send("not like");
  }
});

module.exports = router;
