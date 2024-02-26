require('dotenv').config();
const express = require("express");
const cors = require("cors");
const articleRoute = require('./routes/article.routes');
const PORT = process.env.PORT || 8080;
const cronJob = require("./services/cronJobs");

cronJob();

const app = express();
app.use(cors());
  


app.use(express.json());
app.use(cors());
app.get('/', function(req, res){
    res.send({
        "method": "GET",
        "status":"Active"
    });
});
app.use('/api/v2', articleRoute);
app.use((req, res, next) => { 
  
  //doesn't send response just adjusts it
  res.header("Access-Control-Allow-Origin", "*") //* to give access to any origin
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
  );
  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
      return res.status(200).json({});
  }
  next(); //so that other routes can take over
})

// connectDB();
app.listen(PORT, () => console.log(`Server is running 🔥 on :${PORT}`));
