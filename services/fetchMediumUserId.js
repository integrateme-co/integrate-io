const axios = require('axios');

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
        
        throw e;
    }
}
module.exports = fetchMediumUserId;
