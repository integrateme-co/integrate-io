const POST_URL = "https://dev.to/api/articles/";
const axios  = require("axios");

module.exports = async function(records) {
  try{
    for(index =0; index<records.length; index++)
    {
        const headers = {"api-key": records[index].APIkey}
       await axios.put(POST_URL+ records[index].articleID, {"article": {"published": true}}, { headers })

    }
} catch(err) {
    return err.message;
  }
}