const { default: axios } = require("axios");
const postToDev = require("../services/postToDev");
const postToHashnode = require("../services/postToHashnode");
const logger = require('../services/loggerService')

function mediumURLparser(URL) {
    const arr = URL.split("/");
    const user = arr[3]
    const link = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${user}`
    return { user, link };
}

exports.postFromMedium = async (req, res, next) => {
    try {
        const { url, dev, hash, dev_api, hash_api } = req.body;
        const { user, link } = mediumURLparser(url);
        var article;
        try {
            var { data } = await axios.get(link);
            var { items } = data
            if (items.length != 0) {
                article = items.filter(item => item.link.split("?")[0] === url)
                if (article.length == 0) {
                    logger.error(`Incorrect blog URL of ${user}`)
                    res.status(400).json({ "Error": `Incorrect blog URL of ${user}` });
                }
                article = {
                    "title": article[0].title,
                    "content": article[0].description
                }
            }
            else {
                logger.err("No Blogs by person")
                res.status(400).json({ "Error": "No Blogs by person" });
            }
        }
        catch (err) {
            const { status, statusText } = err.response
            logger.error(`${statusText},Please Check your URL`)
            res.status(status).json({ "Error": `${statusText},Please Check your URL` });
            article = false;
        }

        let Devblog;
        let hashBlog;

        if (dev) {
            Devblog = await postToDev(article, dev_api, "medium");
            if (!Devblog) {
                logger.error("Unable to publish to Dev.to From Medium")
                return res.status(400).json({ "Error": "Unable to publish to Dev.to From Medium" });
            }
        }

        if (hash) {
            hashBlog = await postToHashnode(article, hash_api, "medium");
            if (!hashBlog) {
                logger.error("Unable to publish to Hashnode from Medium")
                return res.status(400).json({ "Error": "Unable to publish to Hashnode from Medium" });
            }
        }
        if (hashBlog || Devblog) {
            logger.info("Blog Sucessfully Posted")
            return res.status(201).json({ "Message": "Blog Sucessfully Posted" });
        }
        logger.error("None Encountred")
        return res.status(400).json({ "Error": "None Encountred" });
    } catch (error) {
        logger.error(error)
        return error;
    }

}