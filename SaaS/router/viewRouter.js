const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/ask', (req, res) => {
  res.render("ask");
});

router.get('/', (req, res) => {
  res.render("home");
});

router.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname,"../public/style.css"));
});

router.get('/about', (req, res) => {
  res.render("about");
});

module.exports = router;
