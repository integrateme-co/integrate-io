const axios = require('axios');
const logger = require('../services/loggerService')
async function fetchMediumUserId(token) {
    try{
        const config = {
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` }
        };
        let result=await axios.get(
            "https://api.medium.com/v1/me",
            config,
        );
        return result.data.data.id;

    }catch(e){
        logger.error(e)
        throw e;
    }
}
module.exports = fetchMediumUserId;
