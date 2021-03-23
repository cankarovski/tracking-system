var chai = require("chai");
var chaiHttp = require("chai-http");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiHttp);
chai.use(chaiAsPromised);
const expect = chai.expect;
const should = chai.should();

const app = require("../app");
const connectDb = require("../connections/ConnectDb");
const Account = require("../models/Account");

describe("API GET routes", () => {
  it("GET /accounts", (done) => {
    chai
      .request(app)
      .get("/accounts")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.length.above(5);
        done();
      });
  }).timeout(5000);

  it("GET /:id?data=string active account", async () => {
    await connectDb("mongo");
    const accounts = await Account.find();
    let activeAccount = accounts.find((acc) => {
      return acc.isActive === true;
    });

    chai
      .request(app)
      .get(`/${activeAccount._id}?data=somestring`)
      .end((err, res) => {
        return expect(res).to.have.status(200);
      });
  }).timeout(5000);

  it("GET /:id?data=string inactive account", async () => {
    await connectDb("mongo");
    const accounts = await Account.find();
    let activeAccount = accounts.find((acc) => {
      return acc.isActive === false;
    });

    chai
      .request(app)
      .get(`/${activeAccount._id}?data=somestring`)
      .end((err, res) => {
        return expect(res).to.have.status(403);
      });
  }).timeout(5000);

  it("GET /:id?data=string unexisting account", (done) => {
    chai
      .request(app)
      .get(`/1?data=somestring`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  }).timeout(5000);

  it("GET /:id?evt=string wrong URL format", (done) => {
    chai
      .request(app)
      .get(`/1?evt=somestring`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  }).timeout(5000);
});
