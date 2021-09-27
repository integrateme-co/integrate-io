/**
 * This File is for Temperory use, To be delete later
 */

const loggerService = require("./services/loggerService");
const postToDev = require('./controller/postToDev.controller');
const postToMediumController = require("./controller/postToMedium.controller");
const postToHashnode = require("./services/postToHashnode");
const hash = require('./services/hash')

// var s = new Date();
// console.log(s)
// s.setMinutes(s.getMinutes()+3);

// loggerService.info("hjshjkjwe")

// console.log(s)

//postToDev();
//postToMediumController()
postToHashnode()
