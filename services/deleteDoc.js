const mongoose = require('mongoose');
const Post = require('../models/schedulePost.model');

exports.delDoc = async() => {
    await Post.deleteMany({publishTime: { $lt : new Date()} }).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error);
        return error; // Failure
    });
}

// QueryDBn  -> record
// Publish  -> rocrd
// Delete D -> 
