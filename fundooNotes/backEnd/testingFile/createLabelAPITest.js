const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const fs=require("fs");
chai.use(chaiHttp);

let should = chai.should();



let testObject=fs.readFileSync("/home/administrator/Desktop/Bridgelab/fundooNotes/backEnd/testingFile/testingObjects.json");
let testData=JSON.parse(testObject);
 let createLabelTestData=testData.createLabelTest;

describe("Create label", () => {
    it("It should not POST create label because of empty label", (done) => {
       
      chai.request(server)
          .post("/createLabel")
          .send(createLabelTestData.emptyLabel)
          .set(testData.tokenSet)
          .end((err, res) => {
                res.should.have.status(422);
            done();
          });
    }); 

    it("It should  not POST create label successfully because of token", (done) => {
       
        chai.request(server)
            .post("/createLabel")
            .send(createLabelTestData.newLabel)
            .end((err, res) => {
                  res.should.have.status(400);
              done();
            });
      }); 

      it("It should   POST create label successfully because of token", (done) => {
       
        chai.request(server)
            .post("/createLabel")
            .send(createLabelTestData.newLabel)
            .set(testData.tokenSet)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      }); 

});