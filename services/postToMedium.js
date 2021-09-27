const axios =  require('axios');

//TODO: Make Dynamic   1. UserID  2. Article Obj  3. Token   through req.body

module.exports = async function postToMedium() {
    let userID = "15663e2233566a737d485e1344dc8a834862bd7aa0a17ff2debaa043cd6f0816d";
    let reqURL = `https://api.medium.com/v1/users/${userID}/posts`;
    let article = {
        "title": "Bnglr FC",
        "contentFormat": "html",
        "content": "<h1>Mumbai FC</h1><p>You’ll walk alone.</p>",
        "canonicalUrl": "http://jamietalbot.com/posts/liverpool-fc",
        "tags": ["football", "sport", "Liverpool"],
        "publishStatus": "draft"
      };

       let token = '2615790132f4a47a93d13abd55f106c94a8150d6a6a9d45d4ea9e2d67f81e2696';

       const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    try {
        let result = await axios.post(
            reqURL,
            article,
            config,
        )
        console.log(result);

    } catch(error){
        console.log(error);
    }


}