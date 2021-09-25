const mongoose = require('mongoose');
const loggerService = require('../services/loggerService');
const keys = require('./keys');

module.exports = async function() {
    mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true    
    }).then(() => {
        console.log("Connected to MongoDB database 🚀")
        loggerService.info("Connected to MongoDB database 🚀");
    })
};