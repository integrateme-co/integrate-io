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

        if (medium) {
            mediumPost = await postToMedium(article, req.body.medium_userID, req.body.medium_token);
            if (!mediumPost) {
                logger.error({ article, medium_userID: req.body.medium_userID, medium_token: req.body.medium_token })
                logger.error("An Error Occured While Posting from Dev.to to Medium")
                return res.status(400).json({ "Error": "An Error Occured While Posting from Dev.to to Medium" });
            }

        }
        if (hash) {
            hashPost = await postToHashnode(article, req.body.hash_token, "dev");
            if (!hashPost) {
                logger.error("An Error Occured While Posting from Dev.to to Hashnode")
                return res.status(400).json({ "Error": "An Error Occured While Posting from Dev.to to Hashnode" });
            }
        }

        if (hashPost || mediumPost) {
            logger.info("Sucessfully Created")
            return res.status(201).json({ "Message": "Sucessfully Created" });;
        }
        logger.info("None Encountred")
        return res.status(400).json({ "Error": "None Encountred" });
    } catch (error) {
        logger.error(error)
        return res.send(error);
    }
}