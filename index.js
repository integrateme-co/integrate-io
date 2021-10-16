require('dotenv').config();
const express = require("express");
const cors = require("cors");
const articleRoute = require('./routes/article.routes');
const PORT = 8080;
const loggerService = require('./services/loggerService');
const expressPinoLogger = require('express-pino-logger');
const connectDB = require('./config/db');
const app = express();
app.use(cors({
    origin: '*'
}));

const loggerMiddleware = expressPinoLogger({
    logger: loggerService,
    autoLogging: true,
});

app.use(loggerMiddleware);

app.use(express.json());
app.use(cors());
app.use('/api/v2', articleRoute);

connectDB();
app.listen(PORT, () => console.log(`Server is running 🔥 on http://localhost:${PORT}`));