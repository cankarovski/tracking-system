const express = require("express");
const connectDb = require("./connections/ConnectDb");
const mainRouter = require("./routes/MainRouter");
const app = express();

const port = process.env.PORT || 8000;

connectDb("mongo")
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.log("Could not connect to MongoDB", err.reason));

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`App running on port number: ${port}`);
});

module.exports = app;
