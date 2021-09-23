const Post = require('../models/schedulePost.model');

exports.searchDB = async() => {

        const records = await Post.find(
            {publishTime: { $lt : new Date()}}
        )
        console.log(records);
        return records;

}