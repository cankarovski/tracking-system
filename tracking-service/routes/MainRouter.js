var express = require("express");
const Account = require("../models/Account");
const redisClient = require("../connections/RedisClient");
var router = express.Router();

router.get("/accounts", async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.query);
  await Account.findById(req.params.id)
    .then((acc) => {
      if (acc.isActive) {
        const event = {
          accountId: req.params.id,
          timestamp: Date.now(),
          ...req.query,
        };
        redisClient.publish("tracking-data", JSON.stringify(event), (msg) => {
          console.log(msg);
        });
        res.send(event);
      } else res.send("Account not active!");
    })
    .catch(() => {
      res.send("Account not found!");
    });
});

module.exports = router;
