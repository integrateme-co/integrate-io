const express = require("express");
const cors = require("cors");
const app = express();
const articleRoute = require('./routes/article.routes');
const PORT = 8080;


// makePost.postArticle();

app.use(express.json());
app.use(cors());
app.use('/api/v2', articleRoute);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));