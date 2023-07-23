const axios = require("axios");
const logger = require('../services/loggerService')


function devBuilder(article) {
  const articleObj = {
    title: article.title,
    markdown: article.body_markdown,
    slug: article.slug,
  }
  return articleObj;
}

function mediumBuilder(article) {
  const arr = article.guid.split('/');
  const articleObj = {
    title: article.title,
    markdown: article.content,
    slug: arr[5],
  }
  return articleObj;
}

module.exports = async function postToHashnode(articleBody, token, platform,publicationId) {
  let authKey = token;
  let article;

  if (platform === "dev") {
    article = devBuilder(articleBody);
  }

  if (platform === "medium") {
    article = mediumBuilder(articleBody);
  }

  try {
    let result = await axios.post(
      "https://api.hashnode.com",
      {
        
        query:"mutation createPublicationStory($publicationId: String!, $input: CreateStoryInput!){ createPublicationStory(publicationId: $publicationId, input: $input){ code success message } }",
        variables: {
          input: {
            title: article.title,
            contentMarkdown: article.markdown,
            tags: [
              {
                _id: "56744723958ef13879b9549b",
                slug: article.slug,
                name: "programmin, web-dev",
              },
            ],
            coverImageURL:
              article.cover_image,
          },
          publicationId: publicationId,
        }
        
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authKey,
        },
      }
    );
    console.log(result.data);
    return result;
  } catch (error) {
    logger.error(error)
  }
}