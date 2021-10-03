const { default: axios } = require("axios");
const postToDev = require("../services/postToDev");
const postToMedium = require("../services/postToMedium");

function hashURLParser(URL){
    const arr = URL.split("/");
    return arr[3];
}

exports.postFromHash = async (req, res, next) => {
    const {url, medium, dev, dev_api, medium_id, medium_api} = req.body;
    const slug = hashURLParser(url)
    try{
      //TODO: Add Dynamic Slug
        const GET_ARTCILE = `{
            post(slug: "beginners-guide-to-hacktoberfest-2021", hostname: ""){
              title
              content
            }
          }`

          let result = await axios.post(
            "https://api.hashnode.com",
            {
              query: GET_ARTCILE,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const hashArticle = result.data.data.post;
          let devArticle;
          let mediumArticle;
          
         if(dev){
          devArticle = await postToDev(hashArticle, dev_api, "hash");
          if(!devArticle){
            return res.status(400).json({"Message": "An Error Occured While Posting on Dev.to from Hashnode"});
          }
         }

         if(medium){
           mediumArticle = await postToMedium(hashArticle, medium_id, medium_api,"hash")
           if(!mediumArticle){
            return res.status(400).json({"Message": "An Error Occured While Posting on Medium from Hashnode"});
          }
         }

         if(mediumArticle || devArticle){
           return res.status(201).json({"Message": "Blog Sucessfully Posted"});
         }

    }catch(error){
        return res.send(error);
    }
}