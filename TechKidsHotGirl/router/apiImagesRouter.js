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
  imagesController.getAllCookImage((err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/page/:pageNo', (req, res) => {
  imagesController.getAllCookImage((err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/:id', (req, res) => {
  imagesController.updateImageView(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(imagesController.cookViewImageData(data));
    }
  });
});

module.exports = router;
