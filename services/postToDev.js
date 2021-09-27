const axios = require('axios');

//TODO: Add Dynamic artticle obj and API key through req.body

const article =  {
    "article": {
      "title": "uzair POOPPBHE!",
      "published": false,
      "body_markdown": "Hello DEV, this is my first post",
      "tags": [
        "discuss",
        "help"
      ],
      "series": "Hello series"
    }
  };

module.exports = async function postToDev () {

    const headers = {'api-key': "ShVKAz7W11Y3e5gKiC9AZ1tb"};

    try {

        let result = await axios.post(
            'https://dev.to/api/articles',
            article,
            {headers},
        )
        console.log(result);

    } catch(error) {
        console.log(error);
    }

}