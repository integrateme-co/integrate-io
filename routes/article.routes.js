const express = require("express");
const router = express.Router();

const {publishArticle} = require('../controller/article.controller');

router.post('/publish', publishArticle);

module.exports= router;