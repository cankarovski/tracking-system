var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const connectDb = require("../connections/ConnectDb");

describe("Connection to DB", () => {
  it("is connected to db successfully", () => {
    return expect(connectDb("mongo")).to.be.fulfilled;
  }).timeout(5000);

  it("has initial accounts in db", async () => {
    await connectDb("mongo");
    const Account = require("../models/Account");
    const accounts = await Account.find();
    return expect(accounts).to.have.length.above(5);
  }).timeout(5000);
});
