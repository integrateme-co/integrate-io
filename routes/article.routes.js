const express = require("express");
const { postFromDev } = require("../controller/postFromDev.controller");
const { postFromHash } = require("../controller/postFromHash.controller");
const { postFromMedium } = require("../controller/postFromMedium.controller");
const router = express.Router();
const {scheduleDevTo} = require('../controller/scheduleDevTo.controller');


router.post("/schedule", scheduleDevTo);

router.post('/dev', postFromDev);

router.post('/medium', postFromMedium);

router.post('/hash', postFromHash);

module.exports = router;