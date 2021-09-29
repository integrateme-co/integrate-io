const express = require("express");
const { postFromDev } = require("../controller/postFromDev.controller");
const router = express.Router();
const {scheduleDevTo} = require('../controller/scheduleDevTo.controller');


router.post("/schedule", scheduleDevTo);

router.post('/dev', postFromDev);

module.exports = router;