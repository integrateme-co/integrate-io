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
  
    const data={
      input:{
        title:article.title,
        contentMarkdown:article.markdown,
        isPartOfPublication: { publicationId: publicationId},
        isRepublished: article.canonicalURL
          ? {
              originalArticleURL: article.canonicalURL,
            }
          : null,
        tags: [
          {
            _id: "56744723958ef13879b9549b",
            slug: article.slug,
            name: "programmin, web-dev",
          },
        ],
      },
      publicationId: publicationId,
      hideFromHashnodeFeed:false,

    };
    
    if (article.cover_image) {
      data.input.coverImageURL = cover_image;
    }
    let result = await axios.post(
      "https://api.hashnode.com",
      
      {
        query: 'mutation createPublicationStory($input: CreateStoryInput!, $publicationId: String!){ createPublicationStory(input: $input, publicationId: $publicationId){ post { slug, publication { domain } } } }',
        variables:data},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authKey,
        },
      }
    );
    console.log(result);
    if (result.data.errors) {
      throw new Error(`Error occured while cross posting to Hashnode: ${result.data.errors[0].message}`);
    }
    return result;
  } catch (error) {
    console.log(error);
    logger.error(error)
  }
}