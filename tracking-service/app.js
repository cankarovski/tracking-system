const mongoose = require("mongoose");
const express = require("express");
const Account = require("./models/Account");
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

app.get("/accounts", async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
});

app.get("/account-create", async (req, res) => {
  const account = new Account({
    accountId: "12345",
    accountName: "Account1",
    isActive: true,
  });
  await account.save().then(() => console.log("Account created"));
  res.send("Account created successfully!");
});

app.get("/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.query);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App running on port number: ${port}`);
});
