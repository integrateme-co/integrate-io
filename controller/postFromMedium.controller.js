const { default: axios } = require("axios");
const postToDev = require("../services/postToDev");
const postToHashnode = require("../services/postToHashnode");

//TODO: Not working on custom medium domain like (username.medium.com)

function mediumURLparser(URL) {
    const arr = URL.split("/");
    const userName = arr[3];
    const slug = arr[4];
    const result = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${arr[3]}`
    return result;
}

//TODO: Add proper Error Handeling

exports.postFromMedium = async(req, res, next) => {
    try{
        const {url, dev, hash, dev_api, hash_api} = req.body;
        const link = mediumURLparser(url);
        const {data} = await axios.get(link);        
        const feed = data;

        const itemArr = feed.items;
        console.log("ITEM ARRAY: ", itemArr);
        const article = itemArr.filter(item => item.link.split("?")[0] === url);

        //TODO: Below empty array check not working
        if(!article){
            res.status(400).json({"Error": "Blog Not found"});
        }
        //TODO: Array is comming in article
        if(dev) {
            const Devblog = await postToDev(article[0], dev_api);

            //TODO: Add Check if !DevBlog
            // if(!Devblog){
            //     return res.status(400).json({"Error": "Unable to publish to Dev"});
            // }

            //TODO: Return Things Properly
            console.log(Devblog)
        }

        if(hash){
            console.log("Article [0]: ", article)
            const hashBlog = await postToHashnode(article[0], hash_api, "medium");
            //TODO: Check if !hashBlog
            console.log(hashBlog);
            if(hashPost || mediumPost){
                return res.status(201).json({"Message": "Blog Sucessfully Posted"});
            }
            return res.status(400).json({"Error": "Invalid Request"});
        }
        return res.status(400).json({"Error": "None Encountred"});
    } catch(error){
        console.log(error);
        return error;
    }

}