const express = require("express");
const connectDb = require("./connections/ConnectDb");
const mainRouter = require("./routes/MainRouter");
const app = express();

const port = process.env.PORT || 8000;

connectDb("mongo")
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.log("Could not connect to MongoDB", err.reason));

app.use("/", mainRouter);

const server = app.listen(port, () => {
  console.log(`App running on port number: ${port}`);
});

process.on("SIGINT", async function onSigint() {
  console.info("Got SIGINT. Graceful shutdown ", new Date().toISOString());
  await server.close();
  console.log("Server closed");
  process.exit();
});

module.exports = app;
