const mongoose = require('mongoose');
const Post = require('../models/schedulePost.model');

exports.delDoc = async () => {
    await Post.deleteMany({ publishTime: { $lt: new Date() } }).then(function () {

    }).catch(function (error) {
        logger.fatal(error);
        return error; // Failure
    });
}