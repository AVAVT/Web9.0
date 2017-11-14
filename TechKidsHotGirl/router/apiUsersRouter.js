const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/', (req, res) => {
  usersController.createUser(req.body, (err, data) => {
    if (err)
      res.status(500).send({ success: false, error: err.message });
    else
      res.status(200).send({ success: true });
  })
});

router.get('/:id', (req, res) => {
  usersController.getUserById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send(err.message);
    else
      res.status(200).send(data);
  })
});

module.exports = router;
