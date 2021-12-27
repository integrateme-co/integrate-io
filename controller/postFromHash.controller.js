const { default: axios } = require("axios");
const postToDev = require("../services/postToDev");
const postToMedium = require("../services/postToMedium");
const logger = require('../services/loggerService')

function hashURLParser(URL) {
  const arr = URL.split("/");
  return arr[3];
}

/**
 * @swagger
 * components:
 *  schemas:
 *      HashPost:
 *          type: object
 *          properties:
 *              url:
 *                  type: string
 *                  description: Article URL
 *              dev:
 *                  type: boolean
 *                  description: If it should post to Dev.to
 *              dev_api:
 *                  type: string
 *                  description: User's Dev.to API token
 *              medium:
 *                  type: boolean
 *                  description: If it should post to Medium
 *              medium_userID:
 *                  type: string
 *                  description: User's medium's user ID can be fetched from (https://api.medium.com/v1/me)
 *              medium_token:
 *                  type: string
 *                  description: User's medium's API token
 *          example:
 *              url: 383924
 *              dev: true
 *              dev_api: ShVKKiC9AZ1tb
 *              medium: true
 *              medium_id: 1543cd6f0816d
 *              medium_api: 2615790132f4a2d67f81e2696
 */
exports.postFromHash = async (req, res, next) => {
  const { url, medium, dev, dev_api, medium_id, medium_api } = req.body;
  const slug = hashURLParser(url)
  try {
    const GET_ARTCILE = `{
            post(slug: "${slug}", hostname: ""){
              title
              content
            }
          }`

    let result = await axios.post(
      "https://api.hashnode.com",
      {
        query: GET_ARTCILE,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const hashArticle = result.data.data.post;
    let devArticle;
    let mediumArticle;

    if (dev) {
      devArticle = await postToDev(hashArticle, dev_api, "hash");
      if (!devArticle) {
        logger.info({ hashArticle, dev_api, platform: "hash" })
        logger.error("An Error Occured While Posting on Dev.to from Hashnode")
        return res.status(400).json({ "Message": "An Error Occured While Posting on Dev.to from Hashnode" });
      }
    }

    if (medium) {
      mediumArticle = await postToMedium(hashArticle, medium_id, medium_api, "hash")
      if (!mediumArticle) {

        logger.info({ hashArticle, medium_id, medium_api, platform: "medium" })
        logger.error("An Error Occured While Posting on Medium from Hashnode")
        return res.status(400).json({ "Message": "An Error Occured While Posting on Medium from Hashnode" });
      }
    }

    if (mediumArticle || devArticle) {
      logger.info("Blog Sucessfully Posted")
      return res.status(201).json({ "Message": "Blog Sucessfully Posted" });
    }
    logger.info("None Encountred")
    return res.status(400).json({ "Error": "None Encountred" });
  } catch (error) {
    logger.error(error)
    return res.send(error);
  }
}