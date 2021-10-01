const { default: axios } = require("axios");
const postToHashnode = require("../services/postToHashnode");
const postToMedium = require("../services/postToMedium");

//TODO: Implement Logger in this endpoint

function devURLParser(URL){
    const arr = URL.split("/");
    const result = `https://dev.to/api/articles/${arr[3]}/${arr[4]}`
    return result;
}

// From Dev to Medium
exports.postFromDev = async(req, res, next) => {
    const {url, medium, hash} = req.body;
    const {data} = await axios.get(devURLParser(url));
    const article = data;

    let mediumPost;

    if(medium){
         mediumPost = await postToMedium(article, req.body.medium_userID, req.body.medium_token);
         if(!mediumPost){
             //TODO: Fix response not sending due to promise
            //return res.status(201).json({"Message": "Sucessfully Created"});
            return res.status(400).json({"Error": "Invalid Request"});
         }
         
     }
     // TODO: 
     if(hash){
         let hashPost = await postToHashnode(article, req.body.hash_token, "dev");
         if(hashPost || mediumPost){
            //TODO: Fix response not sending due to promise
           return res.status(201).json({"Message": "Sucessfully Created"});;
        }
        return res.status(400).json({"Error": "Invalid Request"});
     }
     return res.status(400).json({"Error": "None Encountred"});
  }