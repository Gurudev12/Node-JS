const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

let testData = require('../testJsonFile/test.json')

const labelData=testData.addLabelToNote;
console.log("==>",labelData);

chai.use(chaiHttp);
chai.should();


describe("Negative Test case for add label to note", () => {
    it("It should not POST because of token is invalid", (done) => {
       
      chai.request(server)
          .post("/addLabel")
          .send(labelData.addLabelSuccess)
          .set(testData.invalidToken)
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    }); 

    it("It should not POST because of note id is not matched", (done) => {
       
        chai.request(server)
            .post("/addLabel")
            .send(labelData.invalidLabel)
            .set(testData.tokenSet)
            .end((err, res) => {
                  res.should.have.status(400);
              done();
            });
      }); 
});

describe("Positive Test case for add label to note", () => {
    it("It should not POST because valid data", (done) => {
       
      chai.request(server)
          .post("/addLabel")
          .send(labelData.addLabelSuccess)
          .set(testData.tokenSet)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    }); 
});
