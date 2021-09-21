const DEV_API = "MiXvYZyVvqCP1oPjg2AdHhQp";
const POST_URL = "https://dev.to/api/articles/";
const axios = require('axios');

const article = {
    "article": {
      "title": "Trying Out vdfferergDev.to API",
      "published": true,
      "body_markdown": "Hello I'm trywefghrfgdfing to integrate dev.to API in my new project, so if u see this post published this means that i've integrated it and kindly igore this post :)",
      "tags": [
        "discuss",
        "help"
      ],
      "series": "Hello series"
    }
  };

  const headers = { 
    'api-key': DEV_API
};

exports.publishArticle = (req, res, next) => {
    try {
        axios.post(POST_URL, article, { headers });
        return res.status(201).send({status: "Created"});
    } catch(error) {
        next(error);
    }
}