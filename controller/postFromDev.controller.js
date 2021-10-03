const { default: axios } = require("axios");
const postToHashnode = require("../services/postToHashnode");
const postToMedium = require("../services/postToMedium");

function devURLParser(URL){
    const arr = URL.split("/");
    const result = `https://dev.to/api/articles/${arr[3]}/${arr[4]}`
    return result;
}

exports.postFromDev = async(req, res, next) => {
    try{
        const {url, medium, hash} = req.body;
        const {data} = await axios.get(devURLParser(url));
        const article = data;
    
        let mediumPost;
        let hashPost;
    
        if(medium){
             mediumPost = await postToMedium(article, req.body.medium_userID, req.body.medium_token);
             if(!mediumPost){
                return res.status(400).json({"Error": "An Error Occured While Posting from Dev.to to Medium"});
             }
             
         }
         if(hash){
            hashPost = await postToHashnode(article, req.body.hash_token, "dev");
            if(!hashPost){
                return res.status(400).json({"Error": "An Error Occured While Posting from Dev.to to Hashnode"});
            }
         }
    
         if(hashPost || mediumPost){
            return res.status(201).json({"Message": "Sucessfully Created"});;
         }
         return res.status(400).json({"Error": "None Encountred"});
    }catch(error){
        console.log(error);
        return res.send(error);
    }
  }