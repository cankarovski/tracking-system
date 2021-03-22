const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  accountName: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});
const Account = mongoose.model("Account", accountSchema, "Account");
module.exports = Account;
