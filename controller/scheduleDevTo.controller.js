const ScheduledPost = require('../models/schedulePost.model');
const logger = require('../services/loggerService')

/**
 * @swagger
 * components:
 *  schemas:
 *      ScheduledPost:
 *          type: object
 *          properties:
 *              articleID:
 *                  type: string
 *                  description: Article identifier
 *              APIkey:
 *                  type: string
 *                  description: Your API Key
 *              publishTime:
 *                  type: string
 *                  description: Date time in ISO format
 *          example:
 *              articleID: 383924
 *              APIkey: YOUR_API_KEY
 *              publishTime: 2021-09-23T20:50:41.751Z
 */
exports.scheduleDevTo = async (req, res, next) => {
  const { APIkey, articleID, publishTime } = req.body;
  const schedulePost = new ScheduledPost({
    publishTime: publishTime,
    articleID: articleID,
    APIkey: APIkey
  });

  await schedulePost.save();

  logger.info("Your post has been succesfully scheduled")
  res.status(201).json({ response: "Your post has been succesfully scheduled" });
}