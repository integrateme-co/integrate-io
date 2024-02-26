// const connectDB = require('../config/db');
// connectDB();
const { searchDB } = require("./queryDB");
const publishArticle = require('./publishArticle');
const { delDoc } = require("./deleteDoc");


function cronJob() {
  setInterval(
    async function runJobs() {
      
      const records = await searchDB();
     const publishedResult = await publishArticle(records);
  
    await delDoc();
    }
  ,5000)
}

module.exports = cronJob;
