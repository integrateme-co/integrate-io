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
      //TDOD: Add Dynamic Slug
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
          // return console.log(result.data.data.post);
          const hashArticle = result.data.data.post;
          
         if(dev){
          const devArticle = await postToDev(hashArticle, dev_api, "hash");
          if(!devArticle){
            return res.status(400).json({"Message": "An Error Occured While Posting on Dev.to"});
          }
          return res.status(201).json({"Message": "Article Posted Sucessfully on Dev.to"});
         }

         if(medium){
           const mediumArticle = await postToMedium(hashArticle, medium_id, medium_api,"hash")
           if(!mediumArticle){
            return res.status(400).json({"Message": "An Error Occured While Posting on medium"});
          }
          return res.status(201).json({"Message": "Article Posted Sucessfully on Medium"});
         }

    }catch(error){
        return res.send(error);
    }
}