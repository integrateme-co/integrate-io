const axios = require("axios");


function devBuilder(article){
  const articleObj = {
    title : article.title,
    markdown : article.body_markdown,
    slug : article.slug,
  }
  return articleObj;
}

function mediumBuilder (article){
  const arr = article.guid.split('/');
  const articleObj = {
    title : article.title,
    markdown : article.content,
    slug : arr[5],
  }
  return articleObj;
}

module.exports = async function postToHashnode(articleBody, token, platform) {
  let authKey = token;
  let article;

  if(platform === "dev") {
    article = devBuilder(articleBody);
  }

  if(platform === "medium") {
    article = mediumBuilder(articleBody);
  }

  try {
    let result = await axios.post(
      "https://api.hashnode.com",
      {
        query:
          "mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ code success message } }",
        variables: {
          input: {
            title: article.title,
            contentMarkdown: article.markdown,
            //TODO: Remove Tags below
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
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authKey,
        },
      }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}