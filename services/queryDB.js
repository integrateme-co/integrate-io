const Post = require('../models/schedulePost.model');
const loggerService = require('./loggerService');

exports.searchDB = async() => {
        const records = await Post.find(
            {publishTime: { $lt : new Date()}}
        )

        loggerService.debug(records);
        return records;
}