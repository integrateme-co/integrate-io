const { default: axios } = require("axios");
const postToHashnode = require("../services/postToHashnode");
const postToMedium = require("../services/postToMedium");
const logger = require('../services/loggerService')

function devURLParser(URL) {
    const arr = URL.split("/");
    const result = `https://dev.to/api/articles/${arr[3]}/${arr[4]}`
    return result;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      DevPost:
 *          type: object
 *          properties:
 *              url:
 *                  type: string
 *                  description: Article URL
 *              medium:
 *                  type: boolean
 *                  description: If it should post to Medium
 *              medium_userID:
 *                  type: string
 *                  description: User's medium's user ID can be fetched from (https://api.medium.com/v1/me)
 *              medium_token:
 *                  type: string
 *                  description: User's medium's API token
 *              hash:
 *                  type: boolean
 *                  description: If it should post to Hasnode
 *              hash_token:
 *                  type: string
 *                  description: User's Hashnode API Token
 *          example:
 *              url: 383924
 *              medium: false
 *              hash: true
 *              hash_token: fee010ff-bd64-496a-d28a58e30bb9
 */
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
                logger.error("An Error Occured While Posting from Dev.to to Medium")
                logger.info({ article, medium_userID: req.body.medium_userID, medium_token: req.body.medium_token })
                return res.status(400).json({ "Error": "An Error Occured While Posting from Dev.to to Medium" });
            }

        }
        if (hash) {
            hashPost = await postToHashnode(article, req.body.hash_token, "dev");
            if (!hashPost) {
                logger.error("An Error Occured While Posting from Dev.to to Hashnode")
                logger.info({ article, hash_token: req.body.hash_token, platform: "dev" })
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
