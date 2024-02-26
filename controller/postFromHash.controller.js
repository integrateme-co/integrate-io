const axios = require("axios");
const postToDev = require("../services/postToDev");
const postToMedium = require("../services/postToMedium");

function hashURLParser(URL) {
  const arr = URL.split("/");
  return arr[3];
}

exports.postFromHash = async (req, res, next) => {
  const { url, medium, dev, dev_api, medium_api } = req.body;
  try {
    const slug = hashURLParser(url);
    const GET_ARTICLE = `{
      post(slug: "${slug}", hostname: ""){
        title
        content
      }
    }`;

    const result = await axios.post("https://api.hashnode.com", {
      query: GET_ARTICLE,
    });

    const hashArticle = result.data?.data?.post;

    if (!hashArticle) {
      return res.status(400).json({ Message: "Failed to fetch article from Hashnode" });
    }

    let devArticle, mediumArticle;

    if (dev) {
      devArticle = await postToDev(hashArticle, dev_api, "hash");
      if (!devArticle) {
        return res.status(400).json({ Error: "An Error Occurred While Posting on Dev.to from Hashnode" });
      }
    }

    if (medium) {
      mediumArticle = await postToMedium(hashArticle, medium_api, "hash");
      if (!mediumArticle) {
        return res.status(400).json({ Error: "An Error Occurred While Posting on Medium from Hashnode" });
      }
    }

    if (mediumArticle || devArticle) {
      return res.status(201).json({ Message: "Blog Successfully Posted" });
    }

    return res.status(400).json({ Error: "None Encountered" });
  } catch (error) {

    return res.status(400).json({ Error: "An unexpected error occurred" });
  }
};
