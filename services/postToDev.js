const axios = require('axios');

//TODO: Add Dynamic artticle obj and API key through req.body

module.exports = async function postToDev (article, token) {

    const headers = {'api-key': token};

    const devArticle =  {
        "article": {
          "title": article.title,
          "published": false,
          "body_markdown": article.content,
        }
      };

    try {

        let result = await axios.post(
            'https://dev.to/api/articles',
            devArticle,
            {headers},
        )
        console.log(result);

    } catch(error) {
        console.log(error);
    }

}