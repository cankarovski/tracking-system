const mongoose = require("mongoose");

const db_link = "mongodb://mongo:27017/tracking_db";

const connectDb = () =>
  mongoose.connect(db_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  });

module.exports = connectDb;
