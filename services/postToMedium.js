const axios =  require('axios');

module.exports = async function postToMedium(article, userID, token) {
    let reqURL = `https://api.medium.com/v1/users/${userID}/posts`;

    const mediumArticle = {
        "title": article.title,
        "contentFormat": "html",
        "content": article.body_html,
        "canonicalUrl": article.canonical_url,
        "tags": article.tags,
        "publishStatus": "draft"
      };

       const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    try {
        let result = await axios.post(
            reqURL,
            mediumArticle,
            config,
        )
        return result;
    } catch(error){
        console.log(error);
        return "An Error Occured"
    }
}