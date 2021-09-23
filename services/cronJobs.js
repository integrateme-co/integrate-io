const connectDB = require('../config/db');
connectDB();
const { searchDB } = require("./queryDB");
const publishArticle = require('./publishArticle');
const { delDoc } = require("./deleteDoc");


// setInterval(
//     async function() {
//         const blog = new Post(article);
//           try {
//             await blog.save();
//             console.log(blog);
//           } catch (err) {
//             console.log(err);
//           }
//     }, 5000)
setInterval(
  async function runJobs() {
    const records = await searchDB();
    // if(!records){
    //   return;
    // }
   const publishedResult = await publishArticle(records);
  //  if(!publishedResult){
  //    return;
  //  }
  await delDoc();
  }
,5000)


// runJobs();