const axios = require("axios");
const postToDev = require("../services/postToDev");
const postToHashnode = require("../services/postToHashnode");

function mediumURLparser(URL) {
  const arr = URL.split("/");
  const result = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${arr[3]}`;
  return result;
}

exports.postFromMedium = async (req, res, next) => {
  try {
    const { url, dev, hash, dev_api, hash_api } = req.body;
    const link = mediumURLparser(url);
    const { data } = await axios.get(link);
    const feed = data;

    const itemArr = feed.items;
    const article = itemArr.find((item) => item.link.split("?")[0] === url);

    if (!article) {
      return res.status(400).json({ Error: "Blog Not found" });
    }

    let Devblog;
    let hashBlog;

    if (dev) {
      Devblog = await postToDev(article, dev_api, "medium");
      if (!Devblog) {
        return res.status(400).json({ Error: "Unable to publish to Dev.to From Medium" });
      }
    }

    if (hash) {
      hashBlog = await postToHashnode(article, hash_api, "medium", req.body.hash_userID);
      if (!hashBlog) {
        return res.status(400).json({ Error: "Unable to publish to Hashnode from Medium" });
      }
    }

    if (hashBlog || Devblog) {
      return res.status(201).json({ Message: "Blog Successfully Posted" });
    }

    return res.status(400).json({ Error: "None Encountered" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ Error: "An unexpected error occurred" });
  }
};
