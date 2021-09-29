const axios = require("axios");

module.exports = async function postToHashnode(article, token) {
  let title = article.title;
  let markdown = article.body_markdown;
  let slug = article.slug;
  let authKey = token;
  try {
    let result = await axios.post(
      "https://api.hashnode.com",
      {
        query:
          "mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ code success message } }",
        variables: {
          input: {
            title: title,
            contentMarkdown: markdown,
            tags: [
              {
                _id: "56744723958ef13879b9549b",
                slug: slug,
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