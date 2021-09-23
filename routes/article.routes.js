const express = require("express");
const router = express.Router();
const {scheduleDevTo} = require('../controller/scheduleDevTo.controller');

router.post("/schedule", scheduleDevTo);

module.exports = router;