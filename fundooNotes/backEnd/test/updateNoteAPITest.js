const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const fs=require("fs");

// let testObject=fs.readFileSync("../testJsonFile/test.json");
// let testData=JSON.parse(testObject);

let testData = require('../testJsonFile/test.json')

const updateNote=testData.updateNoteData;
chai.use(chaiHttp);
chai.should();

describe("Negative Test case for update note", () => {
    it("It should not POST because of token is invalid", (done) => {
       
      chai.request(server)
          .post("/updateNote")
          .send(updateNote.updateData)
          .set(testData.invalidToken)
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    }); 
});

describe("Positive Test case for update note", () => {
    it("It should  POST because of valid data", (done) => {
       
      chai.request(server)
          .post("/updateNote")
          .send(updateNote.updateData)
          .set(testData.tokenSet)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    }); 
});
