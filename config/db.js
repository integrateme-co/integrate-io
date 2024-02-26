const mongoose = require('mongoose');
const keys = require('./keys');

module.exports = async function() {
    mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true    
    }).then(() => {
        console.log("Connected to MongoDB database 🚀")
    })
};