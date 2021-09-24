const ScheduledPost = require('../models/schedulePost.model');

exports.scheduleDevTo = async(req, res, next) => {
  const {APIkey, articleID, publishTime} = req.body;
  const schedulePost = new ScheduledPost({
      publishTime: publishTime,
      articleID: articleID,
      APIkey: APIkey
  });

  await schedulePost.save();

  res.status(201).json({response: "You post has been succesfully scheduled"});
}