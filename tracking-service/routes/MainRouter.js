var express = require("express");
const Account = require("../models/Account");
var router = express.Router();

router.get("/accounts", async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
});

router.get("/account-create", async (req, res) => {
  const account = new Account({
    accountId: "12345",
    accountName: "Account1",
    isActive: true,
  });
  await account.save().then(() => console.log("Account created"));
  res.send("Account created successfully!");
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.query);
  res.send("Hello World!");
});

module.exports = router;
