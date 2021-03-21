const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  accountId: {
    type: String,
  },
  accountName: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});
const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
