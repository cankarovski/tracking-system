var express = require("express");
const Account = require("../models/Account");
const redisClient = require("../connections/RedisClient");
var router = express.Router();

router.get("/accounts", async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
});

router.get("/:id", async (req, res) => {
  if (!req.params.id || !req.query.data) {
    res.status(400).send("Wrong event URL format!");
    return;
  }
  await Account.findById(req.params.id)
    .then((acc) => {
      if (acc.isActive) {
        redisClient.publish(
          "tracking-data",
          JSON.stringify({
            accountId: req.params.id,
            timestamp: Date.now(),
            data: req.query.data,
          })
        );
        res.send("OK");
      } else res.status(403).send("Account not active!");
    })
    .catch(() => {
      res.status(401).send("Account not found!");
    });
});

module.exports = router;
