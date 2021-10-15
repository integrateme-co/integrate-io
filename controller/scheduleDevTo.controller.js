const ScheduledPost = require('../models/schedulePost.model');
const logger = require('../services/loggerService')

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