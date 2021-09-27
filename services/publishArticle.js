const POST_URL = "https://dev.to/api/articles/";
const axios  = require("axios");
const loggerService = require("./loggerService");

module.exports = async function(records) {
  try{
    for(index =0; index<records.length; index++)
    {
        const headers = {"api-key": records[index].APIkey}
        let result = await axios.put(POST_URL+ records[index].articleID, {"article": {"published": true}}, { headers });
        //TODO: Add article ID
        loggerService.info(`Article published with ID: {records[index].articleID}`)

    }
} catch(err) {
    loggerService.fatal(err);
    return err.message;
  }
}