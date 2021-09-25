const mongoose = require('mongoose');
const Post = require('../models/schedulePost.model');
const loggerService = require('./loggerService');

exports.delDoc = async() => {
    await Post.deleteMany({publishTime: { $lt : new Date()} }).then(function(){
        loggerService.info("Data Deleted");  // Success
    }).catch(function(error){
        loggerService.fatal(error);
        return error; // Failure
    });
}