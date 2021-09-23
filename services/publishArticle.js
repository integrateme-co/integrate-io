const POST_URL = "https://dev.to/api/articles/";
const axios  = require("axios");

module.exports = async function(records) {
  try{
//   const publishArticles = await records.map(record => {

//         const headers = {"api-key": records[index].APIkey}
//         let result = await axios.put(POST_URL+ record.articleID, {"article": {"published": true}}, { headers });
//         if(!result){
//             return false
//         }
//         return true
//   })

for(index =0; index<records.length; index++)
{
    const headers = {"api-key": records[index].APIkey}
    //console.log(headers)
    //return axios.put(POST_URL + record.articleID, JSON.parse({"published": true}), {headers});
    let result = await axios.put(POST_URL+ records[index].articleID, {"article": {"published": true}}, { headers });
    console.log(result);
}
  } catch(err) {
    console.log(err);
    return err.message;
  }
}