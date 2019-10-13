const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const fs=require("fs");

let testObject=fs.readFileSync("/home/administrator/Desktop/Bridgelab/fundooNotes/backEnd/testingFile/testingObjects.json");


let testData=JSON.parse(testObject);
const deleteLabel=testData.deleteLabelFromNote;
chai.use(chaiHttp);

let should = chai.should();

describe("Negative Test case for delete label from note", () => {
    it("It should not POST because of token is invalid", (done) => {
       
      chai.request(server)
          .post("/deleteLabelFromNote")
          .send(deleteLabel.deleteLabelSuccess)
          .set(testData.invalidToken)
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    }); 

    it("It should not POST because of note id is not matched", (done) => {
       
        chai.request(server)
            .post("/deleteLabelFromNote")
            .send(deleteLabel.invalidLabel)
            .set(testData.tokenSet)
            .end((err, res) => {
                  res.should.have.status(400);
              done();
            });
      }); 
});

describe("Positive Test case for delete label from note", () => {
    it("It should  POST because of valid data", (done) => {
       
      chai.request(server)
          .post("/deleteLabelFromNote")
          .send(deleteLabel.deleteLabelSuccess)
          .set(testData.tokenSet)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    }); 
});
