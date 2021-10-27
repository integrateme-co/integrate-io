const { default: axios } = require("axios");
const postToHashnode = require("../services/postToHashnode");
const postToMedium = require("../services/postToMedium");
const logger = require('../services/loggerService')

function devURLParser(URL) {
    const arr = URL.split("/");
    const result = `https://dev.to/api/articles/${arr[3]}/${arr[4]}`
    return result;
}

exports.postFromDev = async (req, res, next) => {
    try {
        const { url, medium, hash } = req.body;
        const { data } = await axios.get(devURLParser(url));
        const article = data;

        let mediumPost;
        let hashPost;
        let postURL;

        if (medium) {
            mediumPost = await postToMedium(article, req.body.medium_userID, req.body.medium_token);
            if (!mediumPost) {
                logger.error("An Error Occurred While Posting from Dev.to to Medium")
                logger.info({ article, medium_userID: req.body.medium_userID, medium_token: req.body.medium_token })
                return res.status(400).json({ "Error": "An Error Occurred While Posting from Dev.to to Medium" });
            }
            postURL = mediumPost.data.data.url;
        }
        if (hash) {
            hashPost = await postToHashnode(article, req.body.hash_token, "dev");
            if (!hashPost) {
                logger.error("An Error Occurred While Posting from Dev.to to Hashnode")
                logger.info({ article, hash_token: req.body.hash_token, platform: "dev" })
                return res.status(400).json({ "Error": "An Error Occurred While Posting from Dev.to to Hashnode" });
            }
            postURL = `https://hashnode.com/post/${hashPost.data.data.createStory.post.slug}-${hashPost.data.data.createStory.post.cuid}`;
        }

        if (hashPost) {
            logger.info("Successfully Created")
            return res.status(201).json({ "Message": "Successfully Created", "hash_link": postURL });;
        } else if (mediumPost) {
            logger.info("Successfully Created")
            return res.status(201).json({ "Message": "Successfully Created", "medium_link": postURL });;
        }
        logger.info("None Encountered")
        return res.status(400).json({ "Error": "None Encountered" });
    } catch (error) {
        logger.error(error)
        return res.send(error);
    }
}
