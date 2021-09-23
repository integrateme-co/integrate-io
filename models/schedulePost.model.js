const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        publishTime: { type: Date, default: Date.now()},
        articleID: {type: String, required: true},
        APIkey: {type: String},
    }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;