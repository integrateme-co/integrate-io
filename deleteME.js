/**
 * This File is for Temperory use, To be delete later
 */

const loggerService = require("./services/loggerService");

var s = new Date();
console.log(s)
s.setMinutes(s.getMinutes()+3);

loggerService.info("hjshjkjwe")

console.log(s)