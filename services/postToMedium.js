const axios = require('axios');

function hashBuilder(article) {
    const mediumArticle = {
        "title": article.title,
        "contentFormat": "html",
        "content": article.content,
        "publishStatus": "draft"
    };
    return mediumArticle;
}

module.exports = async function postToMedium(article, userID, token, platform) {

    let reqURL = `https://api.medium.com/v1/users/${userID}/posts`;

    let mediumArticle = {
        "title": article.title,
        "contentFormat": "html",
        "content": article.body_html,
        "canonicalUrl": article.canonical_url,
        "tags": article.tags,
        "publishStatus": "draft"
    };

    if (platform === "hash") {
        mediumArticle = hashBuilder(article);
    }

    try {
        let result = await axios.post(
            reqURL,
            mediumArticle, { headers: { Authorization: "Bearer" + token } }
        )
        return result;
    } catch (error) {
        console.log(error);
    }
}