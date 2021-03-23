const mongoose = require("mongoose");

const connectDb = (host) => {
  const db_link = `mongodb://${host}:27017/tracking_db`;
  return mongoose.connect(db_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  });
};

module.exports = connectDb;
