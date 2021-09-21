const DEV_API = process.env.DEV_API;
const POST_URL = "https://dev.to/api/articles/";
const axios = require('axios');

  const headers = { 
    'api-key': DEV_API
};

exports.publishArticle = (req, res, next) => {
  let article = req.body.article;
    try {
        axios.post(POST_URL, article, { headers });
        return res.status(201).send({status: "Created"});
    } catch(error) {
        next(error);
    }
}