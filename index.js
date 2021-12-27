require('dotenv').config();
const express = require("express");
const cors = require("cors");
const articleRoute = require('./routes/article.routes');
const PORT = process.env.PORT || 8080;
const loggerService = require('./services/loggerService');
const expressPinoLogger = require('express-pino-logger');
const connectDB = require('./config/db');
const cronJob = require("./services/cronJobs");
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

cronJob();

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

// Swagger specs
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'IntegrateIO',
        version: '1.0.0',
      },
    },
    apis: ['./routes/*.js', './controller/*.js'], // files containing annotations as above
};
  
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// connectDB();
app.listen(PORT, () => console.log(`Server is running 🔥 on http://localhost:${PORT}`));
