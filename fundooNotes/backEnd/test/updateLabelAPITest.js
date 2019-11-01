const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const fs = require("fs");
chai.use(chaiHttp);

let should = chai.should();

let testObject=fs.readFileSync("./test.json");
let testData = JSON.parse(testObject);
let updateLabelTestData = testData.updateLabelTest;




describe("Update label", () => {
  it("It should not POST update label because of empty field", (done) => {

    chai.request(server)
      .post("/updateLabel")
      .send(updateLabelTestData.emptyLabel)
      .set(testData.tokenSet)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });

  it("It should not POST updatelabel because of login token not got", (done) => {

    chai.request(server)
      .post("/updateLabel")
      .send(updateLabelTestData.emptyLabel)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("It should POST update label ", (done) => {

    chai.request(server)
      .post("/updateLabel")
      .send(updateLabelTestData.updateLabel)
      .set(testData.tokenSet)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});