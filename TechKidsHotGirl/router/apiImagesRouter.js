const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

router.post('/', (req, res) => {
  imagesController.createImage(req.body, (err, newData) => {
    if (err) {
      res.status(500).send("create fail");
    } else {
      res.status(200).send(newData);
    }
  })
});

router.get('/', (req, res) => {
  imagesController.getAllImages((err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/:id', (req, res) => {
  imagesController.getImageById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
