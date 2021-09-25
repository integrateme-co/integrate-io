const connectDB = require('../config/db');
connectDB();
const { searchDB } = require("./queryDB");
const publishArticle = require('./publishArticle');
const { delDoc } = require("./deleteDoc");

setInterval(
  async function runJobs() {
    const records = await searchDB();

    // TODO: Add Checks
   const publishedResult = await publishArticle(records);

  await delDoc();
  }
,5000)
