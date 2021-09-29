const { default: axios } = require("axios");
const postToMedium = require("../services/postToMedium");

function devURLParser(URL){
    const arr = URL.split("/");
    const result = `https://dev.to/api/articles/${arr[3]}/${arr[4]}`
    return result;
}

exports.postFromDev = async(req, res, next) => {
    const {url, medium, hash} = req.body;
    const {data} = await axios.get(devURLParser(url));

    const article = data;

    if(medium){
         let mediumPost = await postToMedium(article, req.body.userID, req.body.token);
         if(mediumPost){
             //TODO: Fix response not sending due to promise
            return res.status(201).json({"Message": "Sucessfully Created"});;
         }
         return res.status(400).json({"Error": "Invalid Request"});
     }
     return res.status(400).json({"Error": "Invalid Request"});
  }