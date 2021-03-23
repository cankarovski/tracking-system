const { should } = require("chai");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const connectDb = require("../connections/ConnectDb");

describe("Connection to DB", () => {
  it("is connected to db successfully", () => {
    return expect(connectDb()).to.be.fulfilled;
  }).timeout(5000);

  it("has initial accounts in db", async () => {
    await connectDb();
    const Account = require("../models/Account");
    const accounts = await Account.find();
    return expect(accounts).to.have.length.above(7);
  }).timeout(5000);
});
