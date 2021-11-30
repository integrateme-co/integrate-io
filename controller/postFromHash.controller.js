const { default: axios } = require("axios");
const postToDev = require("../services/postToDev");
const postToMedium = require("../services/postToMedium");
const logger = require('../services/loggerService')

function hashURLParser(URL) {
  const arr = URL.split("/");
  return arr[3];
}

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
    let postURL;

    if (dev) {
      devArticle = await postToDev(hashArticle, dev_api, "hash");
      if (!devArticle) {
        logger.info({ hashArticle, dev_api, platform: "hash" })
        logger.error("An Error Occurred While Posting on Dev.to from Hashnode")
        return res.status(400).json({ "Message": "An Error Occurred While Posting on Dev.to from Hashnode" });
      }
      postURL = `${devArticle.data.url}/edit`;
    }

    if (medium) {
      mediumArticle = await postToMedium(hashArticle, medium_id, medium_api, "hash")
      if (!mediumArticle) {

        logger.info({ hashArticle, medium_id, medium_api, platform: "medium" })
        logger.error("An Error Occurred While Posting on Medium from Hashnode")
        return res.status(400).json({ "Message": "An Error Occurred While Posting on Medium from Hashnode" });
      }
      postURL = mediumArticle.data.data.url;
    }

    if (mediumArticle) {
      logger.info("Blog Successfully Posted")
      return res.status(201).json({ "Message": "Blog Successfully Posted", "medium_link": postURL });
    } else if (devArticle) {
      logger.info("Blog Successfully Posted")
      return res.status(201).json({ "Message": "Blog Successfully Posted", "dev_link": postURL });
    }
    logger.info("None Encountered")
    return res.status(400).json({ "Error": "None Encountered" });
  } catch (error) {
    logger.error(error)
    return res.send(error);
  }
}
