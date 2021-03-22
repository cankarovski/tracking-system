const mongoose = require("mongoose");
const express = require("express");
const mainRouter = require("./routes/MainRouter.js");
const app = express();

const port = process.env.PORT || 8000;
const db_link = "mongodb://mongo:27017/tracking_db";

mongoose
  .connect(db_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.log("Could not connect to MongoDB", err.reason));

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`App running on port number: ${port}`);
});
